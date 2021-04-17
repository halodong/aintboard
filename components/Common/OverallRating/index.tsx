import { useState } from "react";
import { isEqual } from "lodash";

import Dice1 from "~/assets/img/dice/dice_1.svg";
import Dice2 from "~/assets/img/dice/dice_2.svg";
import Dice3 from "~/assets/img/dice/dice_3.svg";
import Dice4 from "~/assets/img/dice/dice_4.svg";
import Dice5 from "~/assets/img/dice/dice_5.svg";
import Dice6 from "~/assets/img/dice/dice_6.svg";
import {
  RatingFormWrapper,
  RatingLabel,
  DiceContainer,
  FloatRating,
} from "components/Common/RatingForm/styled";

const dices = [
  { comp: <Dice1 className="dice dice-1" /> },
  { comp: <Dice2 className="dice dice-2" /> },
  { comp: <Dice3 className="dice dice-3" /> },
  { comp: <Dice4 className="dice dice-4" /> },
  { comp: <Dice5 className="dice dice-5" /> },
  { comp: <Dice6 className="dice dice-6" /> },
];

const OverallRating = ({ label, rating, paddingBottom }: Props) => {
  let ratingNum = Math.floor(parseFloat(rating));
  return (
    <RatingFormWrapper paddingBottom={paddingBottom}>
      {label && <RatingLabel>{label}</RatingLabel>}
      <DiceContainer hovered>{dices[ratingNum - 1].comp}</DiceContainer>

      {label && <FloatRating>{rating} / 6</FloatRating>}
    </RatingFormWrapper>
  );
};

type Props = {
  label?: string;
  paddingBottom?: string;
  rating: string;
};

export default OverallRating;
