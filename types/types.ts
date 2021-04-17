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
  reviews: ReviewData[];
}

export type ReviewData = {
  _id: string;
  userId: number;
  bgName: string;
  reviewTitle: string;
  reviewContent: string;
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
  userData: UserData;
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
  avatar?: string;
};

export interface ChallengesApiResponse {
  success: boolean;
  response: {
    message: string;
    data: ChallengesApiData;
  };
}

export interface ChallengesApiData {
  challenges: ChallengesData[];
}

export type ChallengesData = {
  [key: string]: string | number;
  _id: string;
  challengeName: string;
  bgId: number;
  bgName: string;
  bgYear: number;
  powerUpAmount: number;
  createdAt: string;
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

//Redux types
export type FilterState = {
  filter: {
    filters: {
      firstSelected: string;
      secondSelected: string | null;
    };
  };
};

export type ModalState = {
  modal: {
    modalChosen: string;
  };
};

export type BgState = {
  bg: {
    bgSearched: {
      bgName: string;
      bgId: string;
      bgYear: string;
      bgImage: string;
    };
  };
};
