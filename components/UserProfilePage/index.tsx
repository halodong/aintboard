import React from "react";
import { useDispatch } from "react-redux";

import {
  UserProfilePageWrapper,
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
// import OnlineBattleCard from "~/components/OnlineBattleCard";
import { ReviewCard } from "~/components/Reviews/ReviewCard";

import { chooseModal } from "redux/slices/modalSlice";
import { ReviewApiResponse } from "~/types/types";
import {
  BUY_AVATARS_BUTTON,
  MAKE_REVIEW_BUTTON,
  CREATE_CHALLENGE_BUTTON,
  CREATE_ONLINE_BATTLE_BUTTON,
} from "util/constants";

const cardButton = [
  { id: 1, title: "Make a Review", type: MAKE_REVIEW_BUTTON },
  { id: 2, title: "Create a Challenge", type: CREATE_CHALLENGE_BUTTON },
  {
    id: 3,
    title: "Create an Online Battle",
    type: CREATE_ONLINE_BATTLE_BUTTON,
  },
  {
    id: 4,
    title: "Buy Avatars",
    type: BUY_AVATARS_BUTTON,
  },
];

const UserProfilePage = ({ reviews }: Props) => {
  const dispatch = useDispatch();

  const onButtonClick = (type: string) => {
    switch (type) {
      case CREATE_CHALLENGE_BUTTON:
        dispatch(chooseModal(CREATE_CHALLENGE_BUTTON));
        break;
    }
  };

  return (
    <UserProfilePageWrapper>
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
            {reviews && reviews?.response?.data?.reviews.length > 0 ? (
              reviews?.response?.data?.reviews?.map((r) => (
                <ReviewCard key={r._id} data={r} />
              ))
            ) : (
              <NoReviews>User has no Reviews yet</NoReviews>
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
            {/* <OnlineBattleCard /> */}
          </OnlineBattleCardWrapper>
          <Button bg="white" onClick={() => {}}>
            See more Online Battles
          </Button>
        </OnlineBattlesSection>
      </RightSide>
    </UserProfilePageWrapper>
  );
};

type Props = {
  reviews?: ReviewApiResponse;
};

export default UserProfilePage;
