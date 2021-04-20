import React from "react";

import ReviewsPage from "~/components/Reviews/ReviewsPage";
import Header from "~/components/Header";

import fetcher from "~/util/fetch";
import { ReviewApiResponse } from "types/types";

const Reviews = ({ reviews }: Props) => {
  return (
    <div>
      <Header isReviewsPage />
      <ReviewsPage reviews={reviews} />
    </div>
  );
};

type Props = {
  reviews: ReviewApiResponse;
};

export default Reviews;

export async function getStaticProps() {
  const reviews = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?first=8`
  );

  return {
    props: {
      reviews,
    },
  };
}
