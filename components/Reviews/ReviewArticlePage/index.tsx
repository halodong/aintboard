import React from "react";
import { ReviewData } from "~/types/types";

import Button from "~/components/Common/Button";
import OverallRating from "~/components/Common/OverallRating";
import Rating from "~/components/Common/Rating";

import * as Styles from "./styled";

const ReviewArticlePage = ({ review }: Props) => {
  const ratingData = [
    { name: "Replayability", rating: review.replayabilityRating },
    { name: "Complexity", rating: review.complexityRating },
    { name: "Aesthetics", rating: review.aestheticsRating },
    { name: "Value for Money", rating: review.valueForMoneyRating },
    { name: "Playing Time", rating: review.playingTimeRating },
    { name: "Components Quality", rating: review.componentsRating },
  ];

  return (
    <Styles.ReviewArticlePageWrapper>
      <Styles.LanguageContainer>
        <Button bg="white">{review.language}</Button>
      </Styles.LanguageContainer>

      <Styles.ReviewContentContainer>
        {review.content}
      </Styles.ReviewContentContainer>

      <Styles.RatingWrapper>
        <Styles.RatingContainer>
          <Styles.RatingName>Overall Rating</Styles.RatingName>
          <OverallRating
            rating={review.overallRating}
            label={review.overallRating}
          />
        </Styles.RatingContainer>
        {ratingData.map((r) => (
          <Styles.RatingContainer>
            <Styles.RatingName>{r.name}</Styles.RatingName>
            <Rating rating={r.rating} />
          </Styles.RatingContainer>
        ))}
      </Styles.RatingWrapper>
    </Styles.ReviewArticlePageWrapper>
  );
};

type Props = {
  review: ReviewData;
};
export default ReviewArticlePage;
