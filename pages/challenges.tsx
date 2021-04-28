import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import ChallengesPage from "~/components/Challenges/ChallengesPage";
import fetcher from "~/util/fetch";

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
  const challenges = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/challenges?first=6`
  );

  return {
    props: {
      challenges,
    },
  };
}
