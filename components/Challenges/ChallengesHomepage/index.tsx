import useSWR from "swr";
import Link from "next/link";
import { isEmpty } from "lodash";
import { useWindowSize } from "react-use";

import {
  GameFont,
  Wrapper,
  CardWrapper,
  CallToAction,
  CallToActionFont,
} from "./styles";
import fetcher from "util/fetch";
import RightArrow from "~/assets/img/rightArrow";
import useCurrentUser from "hooks/useCurrentUser";
import ChallengesCard from "~/components/Challenges/ChallengesCard";
import checkChallengeIfHasAchieved from "util/checkChallengeIfHasAchieved";
import {
  ChallengesApiResponse,
  UserChallengesApiResponse,
  ChallengesData,
} from "~/types/types";

//Challenges section in homepage
export default function ChallengesHomePage({ challenges }: Props) {
  const user = useCurrentUser();
  const { width: windowWidth } = useWindowSize();
  let challengesData = challenges?.response?.data?.challenges;

  if (windowWidth !== 0 && windowWidth <= 600) {
    challengesData = challengesData?.slice(0, 2);
  }

  const userLoggedInData = user?.userData ? JSON.parse(user?.userData) : {};

  const userLoggedInId = isEmpty(userLoggedInData)
    ? null
    : userLoggedInData._id;

  const { data: userChallengeData } = useSWR<UserChallengesApiResponse>(
    userLoggedInId !== null
      ? `/api/userChallenges/filter/userId/${userLoggedInId}`
      : null,
    fetcher
  );

  const renderChallenges = () => {
    return challengesData?.map((challenge: ChallengesData, i: number) => {
      const hasAchieved = checkChallengeIfHasAchieved({
        userChallengeData,
        challenge,
      });

      return (
        <ChallengesCard
          key={`${i}-${challenge._id}`}
          data={challenge}
          achieved={hasAchieved}
        />
      );
    });
  };

  return (
    <Wrapper>
      <GameFont>CHALLENGES</GameFont>
      <p className="slogan">
        Join us to participate on Achieving Ain't Board Challenges
      </p>

      <CardWrapper>
        {renderChallenges()}
        <Link href="/challenges">
          <CallToAction>
            <CallToActionFont>PARTICIPATE</CallToActionFont>
            <RightArrow />
          </CallToAction>
        </Link>
      </CardWrapper>
    </Wrapper>
  );
}

type Props = {
  challenges?: ChallengesApiResponse;
};
