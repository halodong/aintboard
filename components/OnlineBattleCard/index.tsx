import React from "react";
import Image from "next/image";

import PlayButton from "~/assets/img/playbutton.svg";
import {
  OnlineBattleCardWrapper,
  BattleCard,
  BattleDate,
  BattleEnds,
  BattleImage,
  BattleName,
  Rank,
  Place,
  Username,
} from "./styled";

const OnlineBattleCard = () => {
  return (
    <OnlineBattleCardWrapper>
      <BattleImage>
        <Image
          src="https://cf.geekdo-images.com/0BsjJY9MTlx9DRrlkeE69w__original/img/6AJktf34S4ypVI75ecsfmkDicgA=/0x0/filters:format(jpeg)/pic5482020.jpg"
          alt="online battle card"
          layout="fill"
        />
      </BattleImage>

      <PlayButton className="play" />

      <BattleCard>
        <BattleName>Leader Root Battle</BattleName>
        <BattleDate>March 2021</BattleDate>
        <BattleEnds>Ends on March 30</BattleEnds>
        <div>
          <Rank>
            <Place>Top 1</Place>
            <Username>Username 1</Username>
          </Rank>
          <Rank>
            <Place>Top 1</Place>
            <Username>Username 1</Username>
          </Rank>
          <Rank>
            <Place>Top 1</Place>
            <Username>Username 1</Username>
          </Rank>
        </div>
      </BattleCard>
    </OnlineBattleCardWrapper>
  );
};

export default OnlineBattleCard;
