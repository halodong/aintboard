import Header from "~/components/Header";
import ChallengesPage from "~/components/Challenges/ChallengesPage";
import fetcher from "~/util/fetch";

import { ChallengesApiResponse } from "types/types";

const Challenges = ({ challenges }: Props) => {
  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <div>
      <Header isChallengesPage />
      <ChallengesPage challenges={challenges} />
    </div>
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
