import Faqs from "~/components/Faqs";
import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import Footer from "~/components/Common/Footer";

const FaqsPage = () => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="FAQs"
        description="Ain't Board frequently asked questions (FAQs)"
        canonical="/faqs"
      />
      <Header homepage tagline="FAQs" />
      <Faqs />
      <Footer />
    </>
  );
};

export default FaqsPage;
