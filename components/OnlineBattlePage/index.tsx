import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { OnlineBattlesData } from "~/types/types";
import Button from "../Common/Button";

import * as Styles from "./styled";
import GoldIcon from "~/assets/img/Gold";
import BronzeIcon from "~/assets/img/Bronze";
import SilverIcon from "~/assets/img/Silver";
import { createHTML } from "~/util/createHTML";

const OnlineBattlePage = ({ onlineBattle }: Props) => {
  return (
    <Styles.OnlineBattlePageWrapper>
      <Styles.EntryContainer>
        <Styles.EntryImg>
          {onlineBattle?.bgImage ? (
            <Image
              alt="Online Battle"
              src={onlineBattle.bgImage}
              layout="fill"
            />
          ) : (
            <Image
              alt="online battle cover photo"
              src="/img/portrait_def.png"
              layout="fill"
            />
          )}
        </Styles.EntryImg>
        <Styles.EntryRightSide>
          <Button bg="white">Submit Entry</Button>
          <Styles.RanksContainer>
            <Styles.Ranks>
              <Styles.Place>
                <GoldIcon />
              </Styles.Place>
              <Styles.Username>username</Styles.Username>
            </Styles.Ranks>
            <Styles.Ranks>
              <Styles.Place>
                <SilverIcon />
              </Styles.Place>
              <Styles.Username>username</Styles.Username>
            </Styles.Ranks>
            <Styles.Ranks>
              <Styles.Place>
                <BronzeIcon />
              </Styles.Place>
              <Styles.Username>username</Styles.Username>
            </Styles.Ranks>
          </Styles.RanksContainer>
          <Styles.EntryDate>
            Ends on {dayjs(onlineBattle?.eventEndData).format("MMM DD, YYYY")}
          </Styles.EntryDate>
        </Styles.EntryRightSide>
      </Styles.EntryContainer>
      <Styles.EntryDetails>
        <div dangerouslySetInnerHTML={createHTML(onlineBattle?.details)}></div>
      </Styles.EntryDetails>
    </Styles.OnlineBattlePageWrapper>
  );
};

type Props = {
  onlineBattle: OnlineBattlesData;
};

export default OnlineBattlePage;
