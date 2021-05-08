import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import ReviewsPage from "~/components/Reviews/ReviewsPage";

const Reviews = () => {
  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <>
      <Seo
        isHomepage={false}
        title="Reviews"
        description="Reviews by fellow boardgamers with thorough ratings"
        canonical="/reviews"
      />
      <Header isReviewsPage />
      <ReviewsPage />
    </>
  );
};

export default Reviews;
