import Link from "next/link";

import React, { useState, useEffect } from "react";
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
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <Wrapper>
      <GameFont>CHALLENGES</GameFont>
      <p className="slogan">
        Join us to participate on Achieving Ain't Board Challenges
      </p>

      <CardWrapper>
        {windowWidth !== 0 && windowWidth <= 600 ? (
          <>
            <ChallengeCard data={challenges?.response?.data?.challenges?.[0]} />
            <ChallengeCard />
          </>
        ) : (
          <>
            <ChallengeCard data={challenges?.response?.data?.challenges?.[0]} />
            <ChallengeCard />
            <ChallengeCard />
          </>
        )}
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
