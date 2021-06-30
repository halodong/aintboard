import Image from "next/image";
import { isEmpty } from "lodash";
import fetcher from "util/fetch";
import { useState } from "react";
import DOMPurify from "dompurify";
import useSWR from "swr";
import { useRouter } from "next/router";

import * as Styles from "./styled";
import Muscle from "~/assets/img/Muscle";
import Avatar from "~/components/Avatar";
import FadeIn from "~/components/Common/FadeIn";
import PlayButton from "~/assets/img/PlayButton";
import useCurrentUser from "hooks/useCurrentUser";
import ConfirmAchieveModal from "./../ConfirmAchieveModal";
import { ChallengesData, UserApiResponse } from "types/types";
import useContextualRouting from "hooks/useContextualRouting";
import confirmAchieveChallenge from "util/confirmAchieveChallenge";

const ChallengesCard = ({ data, achieved }: Props) => {
  const router = useRouter();
  const { makeContextualHref, returnHref } = useContextualRouting();
  const user = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userApiData } = useSWR<UserApiResponse>(
    `/api/user/filter/_id/${data?.createdBy}`,
    fetcher
  );

  const userData = userApiData?.response?.data?.users || [];
  const userLoggedInData = user?.userData ? JSON.parse(user?.userData) : {};
  const userLoggedInId = isEmpty(userLoggedInData) ? "" : userLoggedInData._id;

  const handleModalOpen = () => {
    if (achieved) {
      return;
    }

    router.push(
      makeContextualHref({ id: data?._id }),
      `/challenge/${data?._id}`,
      {
        shallow: true,
      }
    );
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    if (typeof returnHref === "string") {
      router.push(returnHref, undefined, { shallow: true });
    }
    setIsModalOpen(false);
  };

  return (
    <FadeIn duration={450} delay={100}>
      <Styles.ChallengesCardWrapper onClick={handleModalOpen}>
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
        handleConfirm={() =>
          confirmAchieveChallenge({ data, userLoggedInId, setIsModalOpen })
        }
        closeModal={handleModalClose}
      />
    </FadeIn>
  );
};

type Props = {
  data?: ChallengesData;
  achieved?: boolean;
};

export default ChallengesCard;
