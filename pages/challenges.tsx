import Header from "~/components/Header";
import ChallengesPage from "~/components/ChallengesPage";

const challenges = () => {
  return (
    <div>
      <Header isChallengesPage />
      <ChallengesPage />
    </div>
  );
};

export default challenges;
