export type ApiData = {
  success: boolean;
  response: ApiDataResponse;
};

export interface ApiDataResponse {
  message: string;
  data: object;
}

export interface ReviewApiResponse {
  success: boolean;
  response: {
    message: string;
    data: ReviewApiData;
  };
}

export interface ReviewApiData {
  totalReviewsCount: number;
  hasMore: boolean;
  reviews: ReviewData[];
}

export type ReviewData = {
  [key: string]: string | number | string[] | UserData[] | undefined;
  _id: string;
  userId: number;
  bgName: string;
  slug: string;
  title: string;
  content: string;
  reviewStatus: string;
  reviewType: string;
  replayabilityRating: number;
  complexityRating: number;
  aestheticsRating: number;
  valueForMoneyRating: number;
  playingTimeRating: number;
  componentsRating: number;
  overallRating: string;
  images: string[];
  language: string;
  youtubeUrl?: string;
  createdAt: string;
  userData: UserData[];
};

export interface UserApiResponse {
  success: boolean;
  response: {
    message: string;
    data: UserApiData;
  };
}

export interface UserApiData {
  users: UserData[];
}

export type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  username: string;
  powerups: number;
  stars: number;
  avatar: string;
  gcash: number;
  createdAt: string;
};

export interface ChallengesApiResponse {
  success: boolean;
  response: {
    message: string;
    data: ChallengesApiData;
  };
}

export interface ChallengesApiData {
  hasMore: boolean;
  challenges: ChallengesData[];
}

export type ChallengesData = {
  [key: string]: string | number;
  _id: string;
  createdBy: string;
  challengeName: string;
  bgId: number;
  bgName: string;
  bgImage: string;
  bgYear: number;
  powerUpAmount: number;
  status: string;
  createdAt: string;
};

export interface ReviewLikesApiResponse {
  success: boolean;
  response: {
    totalLikes: number;
    usersWhoLiked: [
      {
        _id: string;
        userId: string | null;
      }
    ];
    message: string;
  };
}

export type CommonData = {
  [key: string]: string | number;
};

export type BggBoardgameApiData = {
  items: BggBoardgameApiDataItem[];
};

export type BggBoardgameApiDataItem = {
  item: BggBoardgameData[];
};

export type BggBoardgameData = {
  name: BggNameArray[];
  _attributes: {
    id: string;
    type: string;
  };
  image: BggImageArray[];
  yearpublished: BggYearArray[];
};

export type BggImageArray = {
  _text: string[];
};

export type BggYearArray = {
  _attributes: {
    value: string;
  };
};

export type BggNameArray = {
  _attributes: BggNameAttrValue;
};

export type BggNameAttrValue = {
  value: string;
};

export interface SpecialAvatarsApiResponse {
  success: boolean;
  response: {
    message: string;
    data: SpecialAvatarsApiData;
  };
}

export interface SpecialAvatarsApiData {
  avatars: SpecialAvatarsData[];
}

export type SpecialAvatarsData = {
  icon: string;
  powerUpAmount: number;
  createdBy: string;
  createdAt: string;
};

export interface UserAvatarsApiResponse {
  success: boolean;
  response: {
    message: string;
    data: UserAvatarsApiData;
  };
}

export interface UserAvatarsApiData {
  userAvatars: UserAvatarsData[];
}

export type UserAvatarsData = {
  _id: string;
  userId: string;
  icon: string;
  createdAt: string;
};

export interface UserChallengesApiResponse {
  success: boolean;
  response: {
    message: string;
    data: UserChallengesApiData;
  };
}

export interface UserChallengesApiData {
  challenge: UserChallengesData[];
  userWithPowerUps: UserData[];
}

export type UserChallengesData = {
  userId: string;
  challengeId: string;
  _id: string;
};

export interface OnlineBattlesApiResponse {
  success: boolean;
  response: {
    message: string;
    data: OnlineBattlesApiData;
  };
}

export interface OnlineBattlesApiData {
  totalOnlineBattlesCount: number;
  hasMore: boolean;
  onlineBattles: OnlineBattlesData[];
}

export type OnlineBattlesData = {
  [key: string]: string | undefined | UserData[];
  _id: string;
  slug: string;
  battleName: string;
  boardGameName: string;
  bgImage: string;
  details: string;
  eventStartDate: string;
  eventEndDate: string;
  createdBy: string;
  status: string;
  createdAt: string;
  userData: UserData[];
};

export interface FilteredOnlineBattlesApiResponse {
  success: boolean;
  response: {
    message: string;
    data: FilteredOnlineBattlesApiData;
  };
}

export interface FilteredOnlineBattlesApiData {
  count: number;
  hasMore: boolean;
  onlineBattles: FilteredOnlineBattlesData[];
}

export type FilteredOnlineBattlesData = {
  battles: OnlineBattlesData[];
};

export interface UserTrophiesApiResponse {
  success: boolean;
  response: {
    message: string;
    data: UserTrophiesApiData;
  };
}

export interface UserTrophiesApiData {
  champions: UserTrophiesData[];
}

export type UserTrophiesData = {
  _id: string;
  userId: string;
  trophyType: string;
  battleId: string;
};
