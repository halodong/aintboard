import Header from "~/components/Header";
import Faqs from "~/components/Faqs";

const FaqsPage = () => {
  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <div>
      <Header homepage tagline="FAQs" />
      <Faqs />
    </div>
  );
};

export default FaqsPage;
