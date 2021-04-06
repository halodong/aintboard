import React from "react";
import { useDispatch } from "react-redux";

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
  NoReviews,
} from "./styled";

import CardButton from "~/components/Common/SideButton";
import Button from "~/components/Common/Button";
import ChallengesCard from "~/components/Challenges/ChallengesCard";
import OnlineBattleCard from "~/components/OnlineBattleCard";
import { ReviewCard } from "~/components/Reviews/ReviewCard";

import { chooseModal } from "redux/slices/modalSlice";
import { ReviewApiResponse, BggBoardgameData } from "~/types/types";
import {
  FOLLOW_AVATAR_BUTTON,
  MAKE_REVIEW_BUTTON,
  CREATE_CHALLENGE_BUTTON,
  CREATE_ONLINE_BATTLE_BUTTON,
} from "util/constants";

const cardButton = [
  { id: 1, title: "Follow this boardgame", type: FOLLOW_AVATAR_BUTTON },
  { id: 2, title: "Make a Review", type: MAKE_REVIEW_BUTTON },
  { id: 3, title: "Create a Challenge", type: CREATE_CHALLENGE_BUTTON },
  {
    id: 4,
    title: "Create an Online Battle",
    type: CREATE_ONLINE_BATTLE_BUTTON,
  },
];

const BoardGamePage = ({ reviews, bgItem }: Props) => {
  const dispatch = useDispatch();

  const onButtonClick = (type: string) => {
    switch (type) {
      case CREATE_CHALLENGE_BUTTON:
        dispatch(chooseModal(CREATE_CHALLENGE_BUTTON));
        break;
    }
  };
  return (
    <BoardGamaPageWrapper>
      <LeftSide>
        {cardButton.map((btn) => (
          <CardButton
            key={`${btn.type}-${btn.id}`}
            onClick={() => onButtonClick(btn.type)}
          >
            {btn.title}
          </CardButton>
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
    </BoardGamaPageWrapper>
  );
};

type Props = {
  reviews: ReviewApiResponse;
  bgItem: BggBoardgameData;
};

export default BoardGamePage;
