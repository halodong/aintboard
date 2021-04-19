import React from "react";
import Image from "next/image";
import dayjs from "dayjs";

import PlayButton from "~/assets/img/playbutton.svg";
import {
  OnlineBattleCardWrapper,
  BattleCard,
  BattleEnds,
  BattleImage,
  BattleName,
  Rank,
  Place,
  Username,
} from "./styled";

import { BattlesData } from "~/types/types";

const OnlineBattleCard = ({ data }: Props) => {
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
        <BattleName>{`${data?.battleName} ${dayjs(data.createdAt).format(
          "MMMM YYYY"
        )}`}</BattleName>
        <BattleEnds>
          Ends on {dayjs(data?.eventEndDate).format("MMM DD")}
        </BattleEnds>
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

type Props = {
  data: BattlesData;
};

export default OnlineBattleCard;
