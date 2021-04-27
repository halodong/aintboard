import Link from "next/link";

import Maze from "~/assets/img/Maze";
import WaterLeft from "~/assets/img/WaterLeft";
import WaterRight from "~/assets/img/WaterRight";
import { ReviewCard } from "~/components/Reviews/ReviewCard";
import { ReviewContainer, ReviewCardWrapper } from "./styled";

import { ReviewApiResponse } from "~/types/types";

const ReviewHomepage = ({ reviews }: Props) => {
  return (
    <ReviewContainer>
      <Maze className="maze" />
      <WaterLeft className="water-left" />
      <WaterRight className="water-right" />

      <ReviewCardWrapper>
        {reviews?.response?.data?.reviews?.map((r) => (
          <ReviewCard key={r._id} data={r} />
        ))}
        <div className="mainButtonContainer">
          <Link href="/reviews">
            <button>See more Reviews</button>
          </Link>
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
