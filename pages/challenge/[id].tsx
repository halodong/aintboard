import { capitalize } from "lodash";
import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import Footer from "~/components/Common/Footer";

import database from "middlewares/dbForFrontend";
import { filterChallenges, getAllChallenges } from "db/challenges";

import { FALLBACK } from "~/util/constants";
import { ChallengesData, ChallengesApiResponse } from "~/types/types";

const ChallengeIdPage = ({ challengeData }: Props) => {
  const challenge = challengeData?.response?.data?.challenges[0];

  return (
    <>
      <Seo
        isHomepage={false}
        title={capitalize(challenge?.challengeName)}
        description={`Win ${challenge?.powerUpAmount} powerups when you achieve this challenge`}
      />
      <Header
        homepage
        isStaticPage
        isAchieveChallengePage
        challenge={challenge}
      />
      <Footer />
    </>
  );
};

type Props = {
  challengeData: ChallengesApiResponse;
};

export default ChallengeIdPage;

export const getStaticProps = async ({ params }: Params) => {
  const { id } = params;

  const db = await database();
  const challengeData = await filterChallenges(db, {
    filter: "_id",
    field: id,
    first: null,
  });

  if (challengeData?.response?.data?.challenges?.length < 1) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      challengeData,
    },
  };
};

type Params = {
  params: {
    id: string;
  };
};

export const getStaticPaths = async () => {
  const db = await database();
  const response = await getAllChallenges(db, { first: 1, offset: null });

  const pathsData =
    response?.success &&
    response?.response?.data?.challenges &&
    response?.response?.data?.challenges?.map((challenge: ChallengesData) => {
      return { params: { id: challenge?._id } };
    });

  return {
    paths: pathsData || [],
    fallback: FALLBACK,
  };
};
