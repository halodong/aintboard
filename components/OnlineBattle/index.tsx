import React from "react";
import OnlineBattleCard from "~/components/OnlineBattleCard";
import { BattleCardWrapper } from "./styles";

import { BattlesApiResponse, BattlesData } from "~/types/types";

const OnlineBattle = ({ battleResponse }: Props) => {
  const battlesData = battleResponse.response.data.battles || [];
  return (
    <>
      <BattleCardWrapper>
        {battlesData.map((b: BattlesData, index) => (
          <OnlineBattleCard key={index} data={b} />
        ))}
      </BattleCardWrapper>
    </>
  );
};

type Props = {
  battleResponse: BattlesApiResponse;
};

export default OnlineBattle;
