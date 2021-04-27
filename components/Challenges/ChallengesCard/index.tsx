import Image from "next/image";
// import useSWR from "swr";
// import fetcher from "~/util/fetch";

import {
  ChallengesCardWrapper,
  PowerUpAmount,
  ChallengeName,
  ImgWrapper,
} from "./styled";
// import PlayButton from "~/assets/img/playbutton.svg";

import { ChallengesData } from "types/types";

const ChallengesCard = ({ data }: Props) => {
  return (
    <ChallengesCardWrapper>
      {/* @TODO change fallback image to an aintboard logo */}
      <ImgWrapper>
        <Image
          src={
            "https://cf.geekdo-images.com/0BsjJY9MTlx9DRrlkeE69w__original/img/6AJktf34S4ypVI75ecsfmkDicgA=/0x0/filters:format(jpeg)/pic5482020.jpg"
          }
          alt="challenge card"
          layout="fill"
        />
      </ImgWrapper>

      <PowerUpAmount>+{data?.powerUpAmount}UP</PowerUpAmount>

      <ChallengeName>
        <p>{data?.challengeName}</p>
        {/* <PlayButton className="play" /> */}
      </ChallengeName>
    </ChallengesCardWrapper>
  );
};

type Props = {
  data?: ChallengesData;
};

export default ChallengesCard;
