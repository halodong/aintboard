import About from "~/components/About";
import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";

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
    </>
  );
};

export default AboutPage;
