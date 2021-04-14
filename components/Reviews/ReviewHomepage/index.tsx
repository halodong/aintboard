import Link from "next/link";

import { Maze, WaterRight } from "~/assets/img";
import { ReviewContainer, ReviewCardWrapper } from "./styled";
import { ReviewCard } from "~/components/Reviews/ReviewCard";
import WaterLeftSvg from "~/assets/img/water-left.svg";

import { ReviewApiResponse } from "~/types/types";

const ReviewHomepage = ({ reviews }: Props) => {
  return (
    <ReviewContainer>
      <Maze className="maze" />
      <WaterLeftSvg className="water-left" />
      <WaterRight className="water-right" />

      <ReviewCardWrapper>
        {reviews?.response?.data?.reviews?.map((r) => (
          <ReviewCard key={r._id} data={r} />
        ))}
        <div className="mainButtonContainer">
          <button>See more Reviews</button>
          <Link href="/review/new">
            <button>Make a Review or Strategy</button>
          </Link>
        </div>
      </ReviewCardWrapper>
    </ReviewContainer>
  );
};

type Props = {
  reviews?: ReviewApiResponse;
};

export default ReviewHomepage;
