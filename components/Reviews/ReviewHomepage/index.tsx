import Link from "next/link";

import Maze from "~/assets/img/Maze";
import WaterLeft from "~/assets/img/WaterLeft";
import WaterRight from "~/assets/img/WaterRight";
import { ReviewCard } from "~/components/Reviews/ReviewCard";
import { ReviewContainer, ReviewCardWrapper } from "./styled";

import { ReviewApiResponse } from "~/types/types";

const ReviewHomepage = ({ reviews }: Props) => {
  const reviewsData = reviews?.response?.data?.reviews || [];

  return (
    <ReviewContainer>
      <Maze className="maze" />
      <WaterLeft className="water-left" />
      <WaterRight className="water-right" />

      <ReviewCardWrapper>
        {reviewsData?.map((r) => (
          <ReviewCard key={r._id} data={r} />
        ))}
        <div className="mainButtonContainer">
          {reviewsData?.length > 0 && (
            <Link href="/reviews">
              <button>See more Reviews</button>
            </Link>
          )}
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
