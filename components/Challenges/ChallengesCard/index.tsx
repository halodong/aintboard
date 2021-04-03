import Image from "next/image";
import {
  ChallengesCardWrapper,
  PowerUpIcon,
  PowerUpAmount,
  ChallengeName,
} from "./styled";

import PlayButton from "~/assets/img/playbutton.svg";

const ChallengesCard = ({ puAmount }: Props) => {
  return (
    <ChallengesCardWrapper>
      <PowerUpIcon>
        <Image
          src="https://cf.geekdo-images.com/0BsjJY9MTlx9DRrlkeE69w__original/img/6AJktf34S4ypVI75ecsfmkDicgA=/0x0/filters:format(jpeg)/pic5482020.jpg"
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
};

export default ChallengesCard;
