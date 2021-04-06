import Header from "~/components/Header";
import About from "~/components/About";

const AboutPage = () => {
  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <div>
      <Header homepage tagline="About Us" />
      <About />
    </div>
  );
};

export default AboutPage;
