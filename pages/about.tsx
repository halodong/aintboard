import About from "~/components/About";
import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import Footer from "~/components/Common/Footer";

const AboutPage = () => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="About Us"
        description="Learn more about Ain't Board"
        canonical="/about"
      />
      <Header homepage tagline="About Us" />
      <About />
      <Footer />
    </>
  );
};

export default AboutPage;
