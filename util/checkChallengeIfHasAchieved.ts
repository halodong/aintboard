import { UserChallengesApiResponse, ChallengesData } from "types/types";

const checkChallengeIfHasAchieved = ({
  userChallengeData,
  challenge,
}: Props) => {
  const achievedChallenges = userChallengeData?.response?.data?.challenge?.filter(
    (userChallenge) => userChallenge?.challengeId === challenge?._id
  );

  const hasAchieved =
    (achievedChallenges && achievedChallenges?.length > 0) || false;

  return hasAchieved;
};

type Props = {
  userChallengeData?: UserChallengesApiResponse;
  challenge: ChallengesData | undefined;
};

export default checkChallengeIfHasAchieved;
