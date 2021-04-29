import React, { useState } from "react";
import Dice1 from "~/assets/img/dice/dice_1.svg";
import Dice2 from "~/assets/img/dice/dice_2.svg";
import Dice3 from "~/assets/img/dice/dice_3.svg";
import Dice4 from "~/assets/img/dice/dice_4.svg";
import Dice5 from "~/assets/img/dice/dice_5.svg";
import Dice6 from "~/assets/img/dice/dice_6.svg";

import {
  DiceContainer,
  RatingFormWrapper,
} from "components/Common/RatingForm/styled";

const dices: any[] = [
  { comp: <Dice1 className="dice dice-1" /> },
  { comp: <Dice2 className="dice dice-2" /> },
  { comp: <Dice3 className="dice dice-3" /> },
  { comp: <Dice4 className="dice dice-4" /> },
  { comp: <Dice5 className="dice dice-5" /> },
  { comp: <Dice6 className="dice dice-6" /> },
];

const Rating = ({ rating = 0 }: Props) => {
  let hovered = dices
    .slice(0, rating)
    .map((dice) => <DiceContainer hovered>{dice.comp}</DiceContainer>);
  let notHovered = dices
    .slice(rating, 6)
    .map((dice) => <DiceContainer hovered={false}>{dice.comp}</DiceContainer>);
  return (
    <RatingFormWrapper>
      {hovered}
      {notHovered}
    </RatingFormWrapper>
  );
};

type Props = {
  rating?: number;
};

export default Rating;
