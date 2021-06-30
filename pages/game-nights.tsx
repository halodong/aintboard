import Header from "components/Header";
import Seo from "components/Common/Seo";
import Footer from "components/Common/Footer";

const GameNights = () => {
  return (
    <>
      <Seo
        isHomepage
        title="Game Nights"
        description="Join other boardgamers playing online!"
        canonical="/game-nights"
      />
      <Header homepage isStaticPage isGameNightsPage>
        Game Nights
      </Header>
      {/* <About /> */}
      <Footer />
    </>
  );
};

export default GameNights;
