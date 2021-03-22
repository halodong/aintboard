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
