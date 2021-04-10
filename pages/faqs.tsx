import Header from "~/components/Header";
import Faqs from "~/components/Faqs";

const AboutPage = () => {
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

export default AboutPage;
