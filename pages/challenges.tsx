import Header from "~/components/Header";
import ChallengesPage from "~/components/Challenges/ChallengesPage";

const Challenges = () => {
  return (
    <div>
      <Header isChallengesPage />
      <ChallengesPage />
    </div>
  );
};

export default Challenges;
