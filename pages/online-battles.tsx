import Seo from "~/components/Common/Seo";
import Header from "~/components/Header/";
import OnlineBattle from "~/components/OnlineBattle";

const OnlineBattles = () => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="Online Battles"
        description="Play a boardgame and get on top of the leaderboards to win trophies"
        canonical="/online-battles"
      />
      <Header isOnlineBattles />
      <OnlineBattle />
    </>
  );
};

export default OnlineBattles;
