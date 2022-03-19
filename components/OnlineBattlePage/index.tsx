import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { OnlineBattlesData } from "~/types/types";

import Button from "../Common/Button";
import * as Styles from "./styled";
import GoldIcon from "~/assets/img/Gold";
import BronzeIcon from "~/assets/img/Bronze";
import SilverIcon from "~/assets/img/Silver";
import { createHTML } from "~/util/createHTML";
import { SUBMIT_ENTRY_BUTTON } from "util/constants";
import { chooseModal } from "redux/slices/modalSlice";

const OnlineBattlePage = ({ onlineBattle }: Props) => {
  const dispatch = useDispatch();
  const hasOnlineBattleEnded = dayjs(onlineBattle?.eventEndDate).isBefore(
    dayjs()
  );
  const endFormatDate = dayjs(onlineBattle?.eventEndDate).format(
    "MMM DD, YYYY"
  );
  const endDateDisplay = hasOnlineBattleEnded
    ? `Ended on ${endFormatDate}`
    : `Ends on ${endFormatDate}`;

  const onSubmitEntry = () => {
    dispatch(
      chooseModal({
        modalChosen: SUBMIT_ENTRY_BUTTON,
        battleEntryId: onlineBattle?._id,
      })
    );
  };

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
              src="/img/landscape_default.png"
              layout="fill"
            />
          )}
        </Styles.EntryImg>
        <Styles.EntryRightSide>
          {!hasOnlineBattleEnded && (
            <Button bg="white" onClick={onSubmitEntry}>
              Submit Entry
            </Button>
          )}
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
          <Styles.EntryDate>{endDateDisplay}</Styles.EntryDate>
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
