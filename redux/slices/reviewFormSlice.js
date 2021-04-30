import { createSlice } from "@reduxjs/toolkit";

import { REVIEW_TYPE } from "../../util/constants";

export const reviewFormSlice = createSlice({
  name: "reviewForm",
  initialState: {
    reviewType: REVIEW_TYPE.REVIEW,
    reviewFormValues: {
      bgName: "",
      reviewContent: "",
      replayabilityRating: 1,
      componentsRating: 1,
      complexityRating: 1,
      aestheticsRating: 1,
      valueForMoneyRating: 1,
      playingTimeRating: 1,
      overallRating: 1,
      images: [],
      reviewTitle: "",
      language: "",
      youtubeUrl: "",
    },
  },
  reducers: {
    setReviewType: (state, action) => {
      state.reviewType = action.payload;
    },
    setReviewFormValues: (state, action) => {
      state.reviewFormValues[action.payload.name] = action.payload.value;
    },
    resetReviewFormValues: (state) => {
      state.reviewFormValues = {
        bgName: "",
        reviewContent: "",
        replayabilityRating: 1,
        componentsRating: 1,
        complexityRating: 1,
        aestheticsRating: 1,
        valueForMoneyRating: 1,
        playingTimeRating: 1,
        overallRating: 1,
        images: "",
        reviewTitle: "",
        language: "",
        youtubeUrl: "",
      };
    },
  },
});

export const {
  setReviewType,
  setReviewFormValues,
  resetReviewFormValues,
} = reviewFormSlice.actions;

export default reviewFormSlice.reducer;
