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
    popup: {
      open: boolean;
      header: "";
      content: "";
    };
    preloader: boolean;
  };
};

export type ReviewFormState = {
  reviewForm: {
    reviewType: string;
    reviewFormValues: {
      bgName: string;
      reviewContent: string;
      replayabilityRating: number;
      componentsRating: number;
      complexityRating: number;
      aestheticsRating: number;
      valueForMoneyRating: number;
      playingTimeRating: number;
      overallRating: number;
      images: string[];
      reviewTitle: string;
      language: string;
      youtubeUrl: string;
    };
  };
};

export type StrategyFormState = {
  strategyForm: {
    strategyFormValues: {
      bgName: string;
      strategyContent: string;
      images: string[];
      strategyTitle: string;
      language: string;
      youtubeUrl: string;
    };
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
