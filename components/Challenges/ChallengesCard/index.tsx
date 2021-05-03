import Image from "next/image";
// import useSWR from "swr";
// import fetcher from "~/util/fetch";

import * as Styles from "./styled";
import PlayButton from "~/assets/img/PlayButton";
import Muscle from "~/assets/img/Muscle";

import { ChallengesData } from "types/types";

const ChallengesCard = ({ data, achieved }: Props) => {
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

      <Styles.ChallengeName>
        <p>{data?.challengeName}</p>
        {achieved ? (
          <Styles.Achieved>
            Achieved <Muscle />
          </Styles.Achieved>
        ) : (
          <PlayButton className="play" />
        )}
      </Styles.ChallengeName>
    </Styles.ChallengesCardWrapper>
  );
};

type Props = {
  data?: ChallengesData;
  achieved?: boolean;
};

export default ChallengesCard;
