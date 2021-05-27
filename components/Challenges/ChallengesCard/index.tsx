import Image from "next/image";
import DOMPurify from "dompurify";

import * as Styles from "./styled";
import PlayButton from "~/assets/img/PlayButton";
import Muscle from "~/assets/img/Muscle";

import { ChallengesData, UserApiResponse } from "types/types";

import useSWR from "swr";
import fetcher from "util/fetch";

import Avatar from "~/components/Avatar";

const ChallengesCard = ({ data, achieved }: Props) => {
  const { data: userApiData } = useSWR<UserApiResponse>(
    `/api/user/filter/_id/${data?.createdBy}`,
    fetcher
  );

  const userData = userApiData?.response?.data?.users || [];

  return (
    <Styles.ChallengesCardWrapper>
      {/* @TODO change fallback image to an aintboard logo */}
      <Styles.ImgWrapper>
        {data && data?.bgImage?.length > 0 ? (
          <Image alt="challenge card" src={`${data?.bgImage}`} layout="fill" />
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
        {userData.map((user) => (
          <Styles.UserContainer>
            <Avatar iconType={user.avatar} />
            <p>{user.username}</p>
          </Styles.UserContainer>
        ))}

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
  );
};

type Props = {
  data?: ChallengesData;
  achieved?: boolean;
};

export default ChallengesCard;
