import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import Footer from "~/components/Common/Footer";
import NewReviewContent from "~/components/Reviews/NewReviewContent";

const NewReviewPage = () => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="About Us"
        description="Learn more about Ain't Board"
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
