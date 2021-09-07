import UpperPart from "./UpperPart";
import BottomPart from "./BottomPart";
import { ReviewData } from "types/types";
import FadeIn from "~/components/Common/FadeIn";
import { ReviewCardContainer } from "./styled";

export const ReviewCard = ({ data }: Props) => {
  return (
    <FadeIn duration={450} delay={100}>
      <ReviewCardContainer>
        <UpperPart data={data} />
        <BottomPart data={data} />
      </ReviewCardContainer>
    </FadeIn>
  );
};

type Props = {
  data: ReviewData;
};
