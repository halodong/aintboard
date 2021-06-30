import useSWR from "swr";
import { isEmpty } from "lodash";

import * as Styles from "./styled";
import fetcher from "util/fetch";
import Button from "components/Common/Button";
import useCurrentUser from "hooks/useCurrentUser";
import confirmAchieveChallenge from "util/confirmAchieveChallenge";
import { ChallengesData, UserChallengesApiResponse } from "types/types";
import checkChallengeIfHasAchieved from "util/checkChallengeIfHasAchieved";

const AchieveChallengeHeader = ({ challenge }: Props) => {
  const user = useCurrentUser();
  const userLoggedInData = user?.userData ? JSON.parse(user?.userData) : {};
  const userLoggedInId = isEmpty(userLoggedInData)
    ? null
    : userLoggedInData._id;

  const { data: userChallengeData } = useSWR<UserChallengesApiResponse>(
    userLoggedInId !== null
      ? `/api/userChallenges/filter/userId/${userLoggedInId}?first=1`
      : null,
    fetcher
  );

  const hasAchieved = checkChallengeIfHasAchieved({
    userChallengeData,
    challenge,
  });

  return (
    <Styles.AchieveChallengeWrapper>
      {hasAchieved ? (
        <Styles.HomepageSubHeading>
          <span className="challenge-name">{challenge?.challengeName}</span>{" "}
          <br />
          You have already achieved this challenge, good one!
        </Styles.HomepageSubHeading>
      ) : (
        <>
          <Styles.HomepageSubHeading>
            <span className="challenge-name">{challenge?.challengeName}</span>{" "}
            <br />
            Have you achieved this challenge? You will get{" "}
            {challenge?.powerUpAmount}
            <Styles.PowerUpText>UP</Styles.PowerUpText>
          </Styles.HomepageSubHeading>
          <Button
            className="confirm-btn"
            bg="lightYellow"
            onClick={() =>
              confirmAchieveChallenge({ data: challenge, userLoggedInId })
            }
          >
            Confirm
          </Button>
        </>
      )}
    </Styles.AchieveChallengeWrapper>
  );
};

type Props = {
  challenge: ChallengesData | undefined;
};

export default AchieveChallengeHeader;
