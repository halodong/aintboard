import React from "react";
import { OnlineBattlesData } from "~/types/types";

import * as Styles from "./styled";
import Avatar from "~/components/Avatar";

const OnlineBattleHeader = ({ onlineBattle }: Props) => {
  return (
    <Styles.HeaderContainer>
      <Styles.HeaderBattleName>
        {onlineBattle?.battleName}
      </Styles.HeaderBattleName>
      <Styles.HeaderBoardGameName>
        {onlineBattle?.boardGameName}
      </Styles.HeaderBoardGameName>
      <Styles.HeaderAuthor>
        <span>created by </span>
        {onlineBattle?.userData?.[0]?.username}
      </Styles.HeaderAuthor>
      <Avatar iconType={onlineBattle?.userData?.[0]?.avatar} />
    </Styles.HeaderContainer>
  );
};

type Props = {
  onlineBattle: OnlineBattlesData;
};

export default OnlineBattleHeader;
