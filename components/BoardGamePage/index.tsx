import React from "react";
import useSWR from "swr";

import {
  BoardGamaPageWrapper,
  LeftSide,
  RightSide,
  ReviewsSection,
  ReviewsCardWrapper,
  H1GameFont,
  H1Rubik,
  ChallengesCardWrapper,
  ChallengesSection,
  OnlineBattleCardWrapper,
  OnlineBattlesSection,
} from "./styled";

import CardButton from "~/components/CardButton";
import Button from "~/components/Common/Button";
import ChallengesCard from "~/components/Challenges/ChallengesCard";
import OnlineBattleCard from "~/components/OnlineBattleCard";
import { ReviewCard } from "~/components/Reviews/ReviewCard";

import { ReviewApiResponse } from "~/types/types";

const cardButton = [
  { id: 1, title: "Follow this boardgame" },
  { id: 2, title: "Make a Review" },
  { id: 3, title: "Create a Challenge" },
  { id: 4, title: "Create an Online Battle" },
];

const BoardGamePage = ({ reviews }: Props) => {
  return (
    <BoardGamaPageWrapper>
      <LeftSide>
        {cardButton.map((btn) => (
          <CardButton key={btn.id}>{btn.title}</CardButton>
        ))}
      </LeftSide>
      <RightSide>
        <ReviewsSection>
          <H1Rubik>REVIEWS</H1Rubik>
          <ReviewsCardWrapper>
            {reviews?.response?.data?.reviews?.map((r) => (
              <ReviewCard key={r._id} data={r} />
            ))}
          </ReviewsCardWrapper>
        </ReviewsSection>

        <ChallengesSection>
          <H1GameFont>CHALLENGES</H1GameFont>
          <ChallengesCardWrapper>
            <ChallengesCard />
            <ChallengesCard />
          </ChallengesCardWrapper>
          <Button bg="white" onClick={() => {}}>
            See more Challenges
          </Button>
        </ChallengesSection>

        <OnlineBattlesSection>
          <H1GameFont>ONLINE BATTLES</H1GameFont>
          <OnlineBattleCardWrapper>
            <OnlineBattleCard />
          </OnlineBattleCardWrapper>
          <Button bg="white" onClick={() => {}}>
            See more Online Battles
          </Button>
        </OnlineBattlesSection>
      </RightSide>
    </BoardGamaPageWrapper>
  );
};

type Props = {
  reviews: ReviewApiResponse;
};

export default BoardGamePage;
