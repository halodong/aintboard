import DiceOne from "~/assets/img/dice/DiceOne";
import DiceTwo from "~/assets/img/dice/DiceTwo";
import DiceThree from "~/assets/img/dice/DiceThree";
import DiceFour from "~/assets/img/dice/DiceFour";
import DiceFive from "~/assets/img/dice/DiceFive";
import DiceSix from "~/assets/img/dice/DiceSix";

import {
  DiceContainer,
  RatingFormWrapper,
} from "components/Common/RatingForm/styled";

const dices: any[] = [
  { comp: <DiceOne className="dice dice-1" /> },
  { comp: <DiceTwo className="dice dice-2" /> },
  { comp: <DiceThree className="dice dice-3" /> },
  { comp: <DiceFour className="dice dice-4" /> },
  { comp: <DiceFive className="dice dice-5" /> },
  { comp: <DiceSix className="dice dice-6" /> },
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
