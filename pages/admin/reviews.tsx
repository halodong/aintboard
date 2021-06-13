import Seo from "components/Common/Seo";
import AdminReviews from "~/components/Admin/AdminReviews";

const Reviews = () => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="Admin"
        description="Admin"
        noIndex="noindex"
        noFollow="nofollow"
      />
      <AdminReviews />;
    </>
  );
};

export default Reviews;
