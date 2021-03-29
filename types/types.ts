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
  bgId: number;
  reviewText: string;
  reviewStatusId: number;
  reviewType: string;
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
};

export type BggNameArray = {
  _attributes: BggNameAttrValue;
};

export type BggNameAttrValue = {
  value: string;
};
