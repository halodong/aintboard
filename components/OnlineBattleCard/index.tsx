import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
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

import { OnlineBattlesData } from "~/types/types";

import GoldIcon from "~/assets/img/Gold";
import BronzeIcon from "~/assets/img/Bronze";
import SilverIcon from "~/assets/img/Silver";

import FadeIn from "~/components/Common/FadeIn";

const OnlineBattleCard = ({ data }: Props) => {
  return (
    <FadeIn duration={450} delay={100}>
      <Link href={`/online-battle/${data?.slug}`}>
        <a href={`/online-battle/${data?.slug}`}>
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
                {`${
                  process.browser
                    ? DOMPurify.sanitize(data?.battleName)
                    : data?.battleName
                }`}{" "}
                <br /> {`${dayjs(data.createdAt).format("MMMM DD YYYY")}`}
              </BattleName>
              <BattleEnds>
                Ends on {dayjs(data?.eventEndDate).format("MMM DD")}
              </BattleEnds>
              <div>
                <Rank>
                  <Place>
                    <GoldIcon />
                  </Place>
                  <Username>Username 1</Username>
                </Rank>
                <Rank>
                  <Place>
                    <SilverIcon />
                  </Place>
                  <Username>Username 1</Username>
                </Rank>
                <Rank>
                  <Place>
                    <BronzeIcon />
                  </Place>
                  <Username>Username 1</Username>
                </Rank>
              </div>
            </BattleCard>
          </OnlineBattleCardWrapper>
        </a>
      </Link>
    </FadeIn>
  );
};

type Props = {
  data: OnlineBattlesData;
};

export default OnlineBattleCard;
