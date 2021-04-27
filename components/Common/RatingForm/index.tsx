import { useState } from "react";
import { isEqual } from "lodash";

import DiceOne from "~/assets/img/dice/DiceOne";
// import Dice1 from "~/assets/img/dice/dice_1.svg";
// import Dice2 from "~/assets/img/dice/dice_2.svg";
// import Dice3 from "~/assets/img/dice/dice_3.svg";
// import Dice4 from "~/assets/img/dice/dice_4.svg";
// import Dice5 from "~/assets/img/dice/dice_5.svg";
// import Dice6 from "~/assets/img/dice/dice_6.svg";
import { RatingFormWrapper, RatingLabel, DiceContainer } from "./styled";

const initialDices = [
  { comp: <DiceOne className="dice dice-1" />, hovered: true, clicked: true },
  // { comp: <Dice2 className="dice dice-2" />, hovered: false, clicked: false },
  // { comp: <Dice3 className="dice dice-3" />, hovered: false, clicked: false },
  // { comp: <Dice4 className="dice dice-4" />, hovered: false, clicked: false },
  // { comp: <Dice5 className="dice dice-5" />, hovered: false, clicked: false },
  // { comp: <Dice6 className="dice dice-6" />, hovered: false, clicked: false },
];

const RatingForm = ({ ratingType, onRatingClick }: Props) => {
  const [diceList, setDiceList] = useState<DiceProps[]>(initialDices);
  const [diceListClicked, setDiceListClicked] = useState<DiceProps[]>(
    initialDices
  );

  const onHover = (i: number, type: string) => {
    let diceMutated = diceList.map((item, index) => {
      // Replace the item
      if (index <= i) {
        return { ...item, hovered: true };
      }

      if (index > i) {
        return { ...item, hovered: false };
      }

      // Leave every other item unchanged
      return item;
    });

    if (type === "hover") {
      return setDiceList(diceMutated);
    }

    onRatingClick(i + 1);

    return setDiceListClicked(diceMutated);
  };

  return (
    <RatingFormWrapper>
      <RatingLabel>{ratingType}</RatingLabel>
      {diceList.map((dice: DiceProps, i: number) => (
        <DiceContainer
          key={i}
          hovered={diceList[i].hovered}
          onMouseEnter={() => onHover(i, "hover")}
          onMouseLeave={() =>
            !isEqual(initialDices, diceList) && setDiceList(diceListClicked)
          }
          onClick={() => onHover(i, "click")}
        >
          {dice.comp}
        </DiceContainer>
      ))}
    </RatingFormWrapper>
  );
};

type Props = {
  ratingType: string;
  onRatingClick: (rating: number) => void;
};

type DiceProps = {
  comp: React.ReactNode;
  hovered: boolean;
};

export default RatingForm;
