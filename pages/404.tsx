import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import NotFound from "~/components/NotFound";
import Footer from "~/components/Common/Footer";

const NotFoundPage = () => {
  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <>
      <Seo isHomepage={false} title="404" canonical="/404" />
      <Header isErrorPage />
      <NotFound />
      <Footer />
    </>
  );
};

export default NotFoundPage;
