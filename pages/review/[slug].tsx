import React from "react";
import Header from "~/components/Header";
import Footer from "~/components/Common/Footer";
import Avatar from "~/components/Avatar";

import ReviewArticlePagge from "~/components/Reviews/ReviewArticlePage";
import { ReviewData, ReviewApiResponse, UserData } from "~/types/types";
import fetcher from "~/util/fetch";
import { FALLBACK } from "~/util/constants";

const Slug = ({ reviewData, userData }: Props) => {
  if (typeof window === "undefined") {
    return <></>;
  }

  const review = reviewData?.response?.data?.reviews[0];
  console.log(review.userData);

  return (
    <div>
      <Header isReviewArticlePage>{}</Header>
      <ReviewArticlePagge review={review} />
      <Footer />
    </div>
  );
};

type Props = {
  reviewData: ReviewApiResponse;
};

export default Slug;

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const { slug } = params;

  const reviewData: ReviewApiResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/review/filter/slug/${slug}`
  );

  if (reviewData?.response?.data?.reviews?.length < 1) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      reviewData,
    },
  };
};

export const getStaticPaths = async () => {
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?first=1`
  );

  const pathsData =
    response?.success &&
    response?.response?.data?.reviews &&
    response?.response?.data?.reviews?.map((review: ReviewData) => {
      return { params: { slug: review?.slug } };
    });

  return {
    paths: pathsData || [],
    fallback: FALLBACK,
  };
};
