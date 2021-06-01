import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import ChallengesPage from "~/components/Challenges/ChallengesPage";

const Challenges = () => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="Challenges"
        description="Play boardgames and achieve challenges to earn PowerUps"
        canonical="/challenges"
      />
      <Header isChallengesPage />
      <ChallengesPage />
    </>
  );
};

export default Challenges;
