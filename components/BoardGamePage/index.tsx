import React from "react";

import {
  BoardGamePageWrapper,
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
  NoReviews,
} from "./styled";

import CardButton from "~/components/CardButton";
import Button from "~/components/Common/Button";
import ChallengesCard from "~/components/Challenges/ChallengesCard";
import OnlineBattleCard from "~/components/OnlineBattleCard";
import { ReviewCard } from "~/components/Reviews/ReviewCard";

import { ReviewApiResponse, BggBoardgameData } from "~/types/types";

const cardButton = [
  { id: 1, title: "Follow this boardgame" },
  { id: 2, title: "Make a Review" },
  { id: 3, title: "Create a Challenge" },
  { id: 4, title: "Create an Online Battle" },
];

const BoardGamePage = ({ reviews, bgItem }: Props) => {
  return (
    <BoardGamePageWrapper>
      <LeftSide>
        {cardButton.map((btn) => (
          <CardButton key={btn.id}>{btn.title}</CardButton>
        ))}
      </LeftSide>
      <RightSide>
        <ReviewsSection>
          <H1Rubik>REVIEWS</H1Rubik>
          <ReviewsCardWrapper>
            {reviews?.response?.data?.reviews.length > 0 ? (
              reviews?.response?.data?.reviews?.map((r) => (
                <ReviewCard
                  key={r._id}
                  data={r}
                  bgImg={bgItem?.image?.[0]._text?.[0] || ""}
                />
              ))
            ) : (
              <NoReviews>No Reviews Yet</NoReviews>
            )}
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
    </BoardGamePageWrapper>
  );
};

type Props = {
  reviews: ReviewApiResponse;
  bgItem: BggBoardgameData;
};

export default BoardGamePage;
