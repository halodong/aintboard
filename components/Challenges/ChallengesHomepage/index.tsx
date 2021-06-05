import Link from "next/link";
import { useWindowSize } from "react-use";

import ChallengeCard from "~/components/Challenges/ChallengesCard";
import {
  GameFont,
  Wrapper,
  CardWrapper,
  CallToAction,
  CallToActionFont,
} from "./styles";
import RightArrow from "~/assets/img/rightArrow";
import { ChallengesApiResponse } from "~/types/types";

//Challenges section in homepage
export default function ChallengesHomePage({ challenges }: Props) {
  const { width: windowWidth } = useWindowSize();
  let challengesData = challenges?.response?.data?.challenges;

  if (windowWidth !== 0 && windowWidth <= 600) {
    challengesData = challengesData?.slice(0, 2);
  }

  return (
    <Wrapper>
      <GameFont>CHALLENGES</GameFont>
      <p className="slogan">
        Join us to participate on Achieving Ain't Board Challenges
      </p>

      <CardWrapper>
        {challengesData?.map((challenge) => {
          return <ChallengeCard data={challenge} />;
        })}
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
