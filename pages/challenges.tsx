import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import ChallengesPage from "~/components/Challenges/ChallengesPage";

import database from "middlewares/dbForFrontend";
import { getAllChallenges } from "db/challenges";
import { ChallengesApiResponse } from "types/types";

const Challenges = ({ challenges }: Props) => {
  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <>
      <Seo
        isHomepage={false}
        title="Challenges"
        description="Play boardgames and achieve challenges to earn PowerUps"
        canonical="/challenges"
      />
      <Header isChallengesPage />
      <ChallengesPage challenges={challenges} />
    </>
  );
};

type Props = {
  challenges: ChallengesApiResponse;
};

export default Challenges;

export async function getStaticProps() {
  const db = await database();
  const challenges = await getAllChallenges(db, { first: 6 });

  return {
    props: {
      challenges,
    },
  };
}
