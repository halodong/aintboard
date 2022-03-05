import React from "react";
import { useDispatch } from "react-redux";

import {
  UserProfilePageWrapper,
  LeftSide,
  TextDetails,
  UserDetails,
  UserIconContainer,
  PowerUps,
} from "./styled";

import RightSideDetails from "./RightSideDetails";
import CardButton from "~/components/Common/SideButton";

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
      detail: user?.response?.data?.users[0]?.stars ?? 0,
    },
    {
      name: <PowerUps>UP</PowerUps>,
      detail: user?.response?.data?.users[0]?.powerups ?? 0,
    },
    {
      name: <GoldIcon className="icon" />,
      detail:
        userTrophies?.response?.data?.champions?.filter(
          (trophy) => trophy.trophyType === "gold"
        )?.length ?? 0,
    },
    {
      name: <SilverIcon className="icon" />,
      detail:
        userTrophies?.response?.data?.champions?.filter(
          (trophy) => trophy.trophyType === "silver"
        )?.length ?? 0,
    },
    {
      name: <BronzeIcon className="icon" />,
      detail:
        userTrophies?.response?.data?.champions?.filter(
          (trophy) => trophy.trophyType === "bronze"
        )?.length ?? 0,
    },
  ];

  return (
    <UserProfilePageWrapper>
      <LeftSide>
        <UserDetails>
          {userMade.map((detail, index) => (
            <TextDetails key={`user-made-${index}`}>
              {detail.name}: {detail.detail}
            </TextDetails>
          ))}
          <br />
          {userIcon.map((detail, index) => (
            <TextDetails key={`user-icon-${index}`}>
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
      <RightSideDetails
        reviews={reviews}
        challenges={challenges}
        userChallenges={userChallenges}
      />
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
