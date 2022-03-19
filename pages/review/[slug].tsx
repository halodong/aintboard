import { capitalize } from "lodash";
import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import Footer from "~/components/Common/Footer";
import ReviewArticlePage from "~/components/Reviews/ReviewArticlePage";
import ReviewArticleHeader from "~/components/Reviews/ReviewArticlePage/Header";

import database from "middlewares/dbForFrontend";
import { filterReviews, getReviews } from "db/reviews";

import { FALLBACK } from "~/util/constants";
import { ReviewData, ReviewApiResponse } from "~/types/types";

const Slug = ({ reviewData }: Props) => {
  const review = reviewData?.response?.data?.reviews[0];

  return (
    <>
      <Seo
        isHomepage={false}
        title={capitalize(reviewData?.response?.data?.reviews[0]?.reviewType)}
        description={reviewData?.response?.data?.reviews[0]?.title}
      />
      <Header isReviewArticlePage>
        <ReviewArticleHeader review={review} />
      </Header>
      <ReviewArticlePage review={review} />
      <Footer />
    </>
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

  const db = await database();
  const reviewData = await filterReviews(db, {
    filter: "slug",
    field: slug,
    first: null,
  });

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
  const db = await database();
  const response = await getReviews(db, {
    first: 1,
    offset: null,
    approved: null,
  });

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
