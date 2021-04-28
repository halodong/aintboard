import React from "react";

import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import ReviewsPage from "~/components/Reviews/ReviewsPage";

import fetcher from "~/util/fetch";
import { ReviewApiResponse } from "types/types";

const Reviews = ({ reviews }: Props) => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="Reviews"
        description="Reviews by fellow boardgamers with thorough ratings"
        canonical="/reviews"
      />
      <Header isReviewsPage />
      <ReviewsPage reviews={reviews} />
    </>
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
