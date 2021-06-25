import { ReviewCardContainer } from "./styled";
import UpperPart from "./UpperPart";
import BottomPart from "./BottomPart";
import { ReviewData } from "types/types";

export const ReviewCard = ({ data }: Props) => {
  return (
    <ReviewCardContainer>
      <UpperPart data={data} />
      <BottomPart data={data} />
    </ReviewCardContainer>
  );
};

type Props = {
  data: ReviewData;
};
