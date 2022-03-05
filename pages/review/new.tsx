import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import Footer from "~/components/Common/Footer";
import NewReviewContent from "~/components/Reviews/NewReviewContent";

const NewReviewPage = () => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="Create Review or Strategy"
        description="Create a boardgame review or a strategy"
        noIndex="noindex"
        noFollow="nofollow"
      />
      <Header isEditorPage />
      <NewReviewContent />
      <Footer />
    </>
  );
};

export default NewReviewPage;
