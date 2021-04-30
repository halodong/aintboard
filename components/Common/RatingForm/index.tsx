import { useState, useEffect } from "react";
import { isEqual } from "lodash";

import DiceOne from "~/assets/img/dice/DiceOne";
import DiceTwo from "~/assets/img/dice/DiceTwo";
import DiceThree from "~/assets/img/dice/DiceThree";
import DiceFour from "~/assets/img/dice/DiceFour";
import DiceFive from "~/assets/img/dice/DiceFive";
import DiceSix from "~/assets/img/dice/DiceSix";
import { RatingFormWrapper, RatingLabel, DiceContainer } from "./styled";

const initialDices = [
  { comp: <DiceOne className="dice dice-1" />, hovered: true, clicked: true },
  { comp: <DiceTwo className="dice dice-2" />, hovered: false, clicked: false },
  {
    comp: <DiceThree className="dice dice-3" />,
    hovered: false,
    clicked: false,
  },
  {
    comp: <DiceFour className="dice dice-4" />,
    hovered: false,
    clicked: false,
  },
  {
    comp: <DiceFive className="dice dice-5" />,
    hovered: false,
    clicked: false,
  },
  { comp: <DiceSix className="dice dice-6" />, hovered: false, clicked: false },
];

const RatingForm = ({ ratingType, onRatingClick, rating = 0 }: Props) => {
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

  useEffect(() => {
    if (rating) onHover(rating - 1, "hover");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RatingFormWrapper>
      {!rating && <RatingLabel>{ratingType}</RatingLabel>}
      {diceList.map((dice: DiceProps, i: number) => (
        <>
          {!rating ? (
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
          ) : (
            <DiceContainer
              key={i}
              hovered={diceList[i].hovered}
              onLoad={() => onHover(rating, "hover")}
            >
              {dice.comp}
            </DiceContainer>
          )}
        </>
      ))}
    </RatingFormWrapper>
  );
};

type Props = {
  ratingType?: string;
  onRatingClick: (rating: number) => void;
  rating?: number;
};

type DiceProps = {
  comp: React.ReactNode;
  hovered: boolean;
};

export default RatingForm;
