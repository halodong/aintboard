import { Maze, WaterLeft, WaterRight } from "~/assets/img";
import { ReviewContainer, ReviewCardWrapper } from "./styled";
import { ReviewCard } from "~/components/ReviewCard";

const ReviewHomepage = () => {
  return (
    <ReviewContainer>
      <Maze className="maze" />
      <WaterLeft className="water-left" />
      <WaterRight className="water-right" />

      <ReviewCardWrapper>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <div className="mainButtonContainer">
          <button>See more Reviews</button>
          <button>Make a Review</button>
        </div>
      </ReviewCardWrapper>
    </ReviewContainer>
  );
};

export default ReviewHomepage;
