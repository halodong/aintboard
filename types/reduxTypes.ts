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
      open: false;
      header: "";
      content: "";
    };
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
      images: string;
      reviewTitle: string;
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
