import Faqs from "~/components/Faqs";
import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";

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
    </>
  );
};

export default FaqsPage;
