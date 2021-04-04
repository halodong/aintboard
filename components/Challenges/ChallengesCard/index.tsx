import Image from "next/image";
import useSWR from "swr";
import fetcher from "~/util/fetch";

import {
  ChallengesCardWrapper,
  PowerUpIcon,
  PowerUpAmount,
  ChallengeName,
} from "./styled";
import PlayButton from "~/assets/img/playbutton.svg";

import { ChallengesData, BggBoardgameApiData } from "types/types";

const ChallengesCard = ({ puAmount, challenges }: Props) => {
  const { data: bgData } = useSWR<BggBoardgameApiData>(
    `/api/bg/${challenges?.bgId || 1}`,
    fetcher
  );

  // @TODO this is used for images only, should be from mongodb
  const bgItem = bgData?.items?.[0]?.item?.[0] || null;

  return (
    <ChallengesCardWrapper>
      <PowerUpIcon>
        {/* @TODO change fallback image to an aintboard logo */}
        <Image
          src={
            bgItem?.image?.[0]?._text?.[0] ||
            "https://cf.geekdo-images.com/0BsjJY9MTlx9DRrlkeE69w__original/img/6AJktf34S4ypVI75ecsfmkDicgA=/0x0/filters:format(jpeg)/pic5482020.jpg"
          }
          alt="challenge card"
          layout="fill"
        />
      </PowerUpIcon>

      <PowerUpAmount>+{puAmount}UP</PowerUpAmount>

      <ChallengeName>
        <p>Score 170 VP in a 4-Player match in Brass Lancashire</p>
        <PlayButton className="play" />
      </ChallengeName>
    </ChallengesCardWrapper>
  );
};

type Props = {
  puAmount?: number;
  challenges?: ChallengesData;
};

export default ChallengesCard;
