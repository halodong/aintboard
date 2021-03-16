export type BggBoardgameApiData = {
  items: BggBoardgameApiDataItem[];
};

export type BggBoardgameApiDataItem = {
  item: BggBoardgameData[];
};

export type BggBoardgameData = {
  name: BggNameArray[];
};

export type BggNameArray = {
  _attributes: BggNameAttrValue;
};

export type BggNameAttrValue = {
  value: string;
};
