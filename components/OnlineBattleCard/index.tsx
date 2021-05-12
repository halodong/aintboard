import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import DOMPurify from "dompurify";

import PlayButton from "~/assets/img/PlayButton";
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
        {data?.bgImage && data?.bgImage.length > 0 ? (
          <Image alt="boardgame" src={data.bgImage} layout="fill" />
        ) : (
          <Image
            alt="online battle cover photo"
            src="/img/portrait_def.png"
            layout="fill"
          />
        )}
      </BattleImage>

      <PlayButton className="play" />

      <BattleCard>
        <BattleName>
          {`${DOMPurify.sanitize(data?.battleName)}`} <br />{" "}
          {`${dayjs(data.createdAt).format("MMMM DD YYYY")}`}
        </BattleName>
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
