import Header from "~/components/Header";
import Footer from "~/components/Common/Footer";
import NewReviewContent from "~/components/Reviews/NewReviewContent";

const NewReviewPage = () => {
  return (
    <>
      <Header isEditorPage />
      <NewReviewContent />
      <Footer />
    </>
  );
};

export default NewReviewPage;
