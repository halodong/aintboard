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
  TextDetails,
  UserDetails,
  UserIconContainer,
  PowerUps,
} from "./styled";

import CardButton from "~/components/Common/SideButton";
import Button from "~/components/Common/Button";
import ChallengesCard from "~/components/Challenges/ChallengesCard";
// import OnlineBattleCard from "~/components/OnlineBattleCard";
import { ReviewCard } from "~/components/Reviews/ReviewCard";

import { chooseModal } from "redux/slices/modalSlice";
import {
  ChallengesApiResponse,
  OnlineBattlesApiResponse,
  ReviewApiResponse,
  UserApiResponse,
  UserChallengesApiResponse,
  UserTrophiesApiResponse,
} from "~/types/types";
import {
  BUY_AVATARS_BUTTON,
  MAKE_REVIEW_BUTTON,
  CREATE_CHALLENGE_BUTTON,
  CREATE_ONLINE_BATTLE_BUTTON,
} from "util/constants";
import dayjs from "dayjs";
import useSWR from "swr";

import StarIcon from "~/assets/img/Star";
import GoldIcon from "~/assets/img/Gold";
import BronzeIcon from "~/assets/img/Bronze";
import SilverIcon from "~/assets/img/Silver";
import fetcher from "~/util/fetch";

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

const UserProfilePage = ({
  user,
  reviews,
  challenges,
  userChallenges,
}: Props) => {
  const dispatch = useDispatch();

  const onButtonClick = (type: string) => {
    switch (type) {
      case CREATE_CHALLENGE_BUTTON:
        dispatch(chooseModal(CREATE_CHALLENGE_BUTTON));
        break;
    }
  };

  const { data: reviewsMadeData } = useSWR<ReviewApiResponse>(
    `/api/review/filter/userId/${user?.response.data.users[0]._id}`,
    fetcher
  );

  const { data: challengesMadeData } = useSWR<ChallengesApiResponse>(
    `/api/challenge/filter/createdBy/${user?.response.data.users[0]._id}`,
    fetcher
  );

  const { data: onlineBattlesMadeData } = useSWR<OnlineBattlesApiResponse>(
    `/api/online-battles/filter/createdBy/${user?.response.data.users[0]._id}`,
    fetcher
  );

  const { data: userTrophies } = useSWR<UserTrophiesApiResponse>(
    `/api/online-battle/filter/userId/${user?.response.data.users[0]._id}`,
    fetcher
  );

  const userMade = [
    {
      name: "Joined",
      detail: dayjs(user?.response?.data?.users[0]?.createdAt).format(
        "MMM DD, YYYY"
      ),
    },
    {
      name: "Reviews made",
      detail: reviewsMadeData?.response?.data?.reviews?.length,
    },
    {
      name: "Challenges made",
      detail: challengesMadeData?.response?.data?.challenges?.length,
    },
    {
      name: "Online Battles made",
      detail: onlineBattlesMadeData?.response?.data?.onlineBattles?.length,
    },
  ];

  const userIcon = [
    {
      name: <StarIcon className="icon" />,
      detail: user?.response?.data?.users[0]?.stars,
    },
    {
      name: <PowerUps className="icon">UP</PowerUps>,
      detail: user?.response?.data?.users[0]?.powerups,
    },
    {
      name: <GoldIcon className="icon" />,
      detail: userTrophies?.response?.data?.champions?.filter(
        (trophy) => trophy.trophyType === "gold"
      )?.length,
    },
    {
      name: <SilverIcon className="icon" />,
      detail: userTrophies?.response?.data?.champions?.filter(
        (trophy) => trophy.trophyType === "silver"
      )?.length,
    },
    {
      name: <BronzeIcon className="icon" />,
      detail: userTrophies?.response?.data?.champions?.filter(
        (trophy) => trophy.trophyType === "bronze"
      )?.length,
    },
  ];

  return (
    <UserProfilePageWrapper>
      <LeftSide>
        <UserDetails>
          {userMade.map((detail, index) => (
            <TextDetails key={index}>
              {detail.name}: {detail.detail}
            </TextDetails>
          ))}
          <br />
          {userIcon.map((detail, index) => (
            <TextDetails key={index}>
              {detail.detail}
              <UserIconContainer>{detail.name}</UserIconContainer>
            </TextDetails>
          ))}
          <br />
        </UserDetails>
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
            {challenges &&
            challenges?.response?.data?.challenges?.length > 0 ? (
              <>
                <ChallengesCard
                  key={challenges?.response?.data?.challenges[0]?._id}
                  data={challenges?.response?.data?.challenges[0]}
                />
                {challenges?.response?.data?.challenges
                  ?.filter(
                    (c) =>
                      c._id ===
                      userChallenges?.response?.data?.challenge[0]?.challengeId
                  )
                  .map((c) => (
                    <ChallengesCard key={c._id} data={c} achieved />
                  ))}
              </>
            ) : (
              <NoReviews>User has no Challenges yet</NoReviews>
            )}
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
  user?: UserApiResponse;
  reviews?: ReviewApiResponse;
  challenges?: ChallengesApiResponse;
  userChallenges?: UserChallengesApiResponse;
  reviewMade?: ReviewApiResponse;
  challengeMade?: ChallengesApiResponse;
  onlineBattleMade?: OnlineBattlesApiResponse;
  userTrophies?: UserTrophiesApiResponse;
};

export default UserProfilePage;
