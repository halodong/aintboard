import { Maze, WaterRight } from "~/assets/img";
import { ReviewContainer, ReviewCardWrapper } from "./styled";
import { ReviewCard } from "~/components/ReviewCard";
import WaterLeftSvg from "~/assets/img/water-left.svg";

const ReviewHomepage = () => {
  return (
    <ReviewContainer>
      <Maze className="maze" />
      <WaterLeftSvg className="water-left" />
      <WaterRight className="water-right" />

      <ReviewCardWrapper>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </ReviewCardWrapper>
    </ReviewContainer>
  );
};

export default ReviewHomepage;
