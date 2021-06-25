import axios from "axios";
import Image from "next/image";
import { isEmpty } from "lodash";
import fetcher from "util/fetch";
import { useState } from "react";
import DOMPurify from "dompurify";
import useSWR, { mutate } from "swr";

import * as Styles from "./styled";
import Muscle from "~/assets/img/Muscle";
import Avatar from "~/components/Avatar";
import PlayButton from "~/assets/img/PlayButton";
import useCurrentUser from "hooks/useCurrentUser";
import ConfirmAchieveModal from "./../ConfirmAchieveModal";
import { ChallengesData, UserApiResponse } from "types/types";

import FadeIn from "~/components/Common/FadeIn";

const ChallengesCard = ({ data, achieved }: Props) => {
  const user = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userApiData } = useSWR<UserApiResponse>(
    `/api/user/filter/_id/${data?.createdBy}`,
    fetcher
  );

  const userData = userApiData?.response?.data?.users || [];
  const userLoggedInData = user?.userData ? JSON.parse(user?.userData) : {};
  const userLoggedInId = isEmpty(userLoggedInData) ? "" : userLoggedInData._id;

  const handleConfirm = async () => {
    const response = await axios.post("/api/user/challenge", {
      userId: userLoggedInId,
      challengeId: data?._id,
      powerups: data?.powerUpAmount,
    });

    if (response.data?.success) {
      // revalidate user challenges data to show achieved status in card
      mutate(`/api/userChallenges/filter/userId/${userLoggedInId}?first=1`);
      // revalidate userdata to fetch updated powerups
      mutate(`/api/user/filter/_id/${userLoggedInId}`);
      setIsModalOpen(false);
    }
  };

  return (
    <FadeIn duration={450} delay={100}>
      <Styles.ChallengesCardWrapper onClick={() => setIsModalOpen(true)}>
        <Styles.ImgWrapper>
          {data && data?.bgImage?.length > 0 ? (
            <Image
              alt="challenge card"
              src={`${data?.bgImage}`}
              layout="fill"
            />
          ) : (
            <Image
              src="/img/portrait_def.png"
              alt="challenge card"
              layout="fill"
            />
          )}
        </Styles.ImgWrapper>

        <Styles.PowerUpAmount>+{data?.powerUpAmount}UP</Styles.PowerUpAmount>

        <Styles.RightSide>
          <Styles.UserContainer>
            <Avatar iconType={userData?.[0]?.avatar} />
            <p>{userData?.[0]?.username}</p>
          </Styles.UserContainer>

          <Styles.ChallengeName>
            <p>
              {process.browser
                ? DOMPurify.sanitize(data?.challengeName || "")
                : data?.challengeName}
            </p>
            {achieved ? (
              <Styles.Achieved>
                Achieved <Muscle />
              </Styles.Achieved>
            ) : (
              <PlayButton className="play" />
            )}
          </Styles.ChallengeName>
        </Styles.RightSide>
      </Styles.ChallengesCardWrapper>
      <ConfirmAchieveModal
        isOpen={isModalOpen}
        powerups={data?.powerUpAmount || 0}
        challengeName={
          process.browser
            ? DOMPurify.sanitize(data?.challengeName || "")
            : data?.challengeName || ""
        }
        handleConfirm={handleConfirm}
        closeModal={() => setIsModalOpen(false)}
      />
    </FadeIn>
  );
};

type Props = {
  data?: ChallengesData;
  achieved?: boolean;
};

export default ChallengesCard;
