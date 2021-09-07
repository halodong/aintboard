import DiceOne from "~/assets/img/dice/DiceOne";
import DiceTwo from "~/assets/img/dice/DiceTwo";
import DiceThree from "~/assets/img/dice/DiceThree";
import DiceFour from "~/assets/img/dice/DiceFour";
import DiceFive from "~/assets/img/dice/DiceFive";
import DiceSix from "~/assets/img/dice/DiceSix";

import {
  RatingFormWrapper,
  DiceContainer,
  FloatRating,
} from "components/Common/RatingForm/styled";

const dices = [
  { comp: <DiceOne className="dice dice-1" /> },
  { comp: <DiceTwo className="dice dice-2" /> },
  { comp: <DiceThree className="dice dice-3" /> },
  { comp: <DiceFour className="dice dice-4" /> },
  { comp: <DiceFive className="dice dice-5" /> },
  { comp: <DiceSix className="dice dice-6" /> },
];

const OverallRating = ({
  label,
  rating,
  paddingBottom,
  big,
  noPointer,
}: Props) => {
  let ratingNum = Math.floor(parseFloat(rating));

  return (
    <RatingFormWrapper
      paddingBottom={paddingBottom}
      big={big}
      noPointer={noPointer}
    >
      <DiceContainer hovered>{dices[ratingNum - 1]?.comp}</DiceContainer>

      {label && <FloatRating>{rating} / 6</FloatRating>}
    </RatingFormWrapper>
  );
};

type Props = {
  label?: string | boolean;
  paddingBottom?: string;
  rating: string;
  big?: boolean;
  noPointer?: boolean;
};

export default OverallRating;
