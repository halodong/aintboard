import React from "react";
import ChallengeCard from "~/components/Challenges/ChallengesCard";
import {
  GameFont,
  Wrapper,
  CardWrapper,
  CallToAction,
  CallToActionFont,
} from "./styles";
import RightArrow from "~/assets/img/rightArrow";

export default function ChallengesHomePage() {
  return (
    <Wrapper>
      <GameFont>CHALLENGES</GameFont>
      <p className="slogan">
        Join us to participate on Achieving Ain't Board Challenges
      </p>

      <CardWrapper>
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <CallToAction>
          <CallToActionFont>PARTICIPATE</CallToActionFont>
          <RightArrow />
        </CallToAction>
      </CardWrapper>
    </Wrapper>
  );
}
