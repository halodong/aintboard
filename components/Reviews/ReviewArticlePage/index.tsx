import ReactPlayer from "react-player";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";

import { ReviewData } from "~/types/types";
import { createHTML } from "~/util/createHTML";

import Button from "~/components/Common/Button";
import OverallRating from "~/components/Common/OverallRating";
import RatingForm from "~/components/Common/RatingForm";

import * as Styles from "./styled";
import { YoutubeContainer } from "../NewReviewContent/styled";

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
      <Styles.ReviewHeader>
        <Styles.ReviewHeaderLeft>
          <Button bg="white">{review.language}</Button>
          <Styles.OverallRating>
            <OverallRating rating={review.overallRating} big />
            <span>{review.overallRating}</span>
          </Styles.OverallRating>
        </Styles.ReviewHeaderLeft>
        <Styles.SliderWrapper>
          {review.images && (
            <AwesomeSlider animation="cubeAnimation">
              {review.images?.map((r) => (
                <div data-src={r} />
              ))}
            </AwesomeSlider>
          )}
        </Styles.SliderWrapper>
      </Styles.ReviewHeader>

      <Styles.ReviewContentContainer>
        <div
          className="preview"
          dangerouslySetInnerHTML={createHTML(review.content)}
        ></div>
      </Styles.ReviewContentContainer>

      <Styles.RatingWrapper>
        <Styles.RatingContainer>
          <Styles.RatingName>Overall Rating</Styles.RatingName>
          <OverallRating rating={review.overallRating} label />
        </Styles.RatingContainer>
        {ratingData.map((r, i) => (
          <Styles.RatingContainer key={`${r.name}-${i}`}>
            <Styles.RatingName>{r.name}</Styles.RatingName>
            <RatingForm onRatingClick={() => {}} rating={r.rating} />
          </Styles.RatingContainer>
        ))}
      </Styles.RatingWrapper>

      <YoutubeContainer>
        {review?.youtubeUrl &&
          review?.youtubeUrl?.length > 0 &&
          isNaN(parseInt(review.youtubeUrl)) && (
            <ReactPlayer url={review.youtubeUrl} width="40rem" />
          )}
      </YoutubeContainer>

      {/* {review?.userData?.[0]?.gcash && (
        <Styles.TipText>
          Send tips to the author!
          <br />
          Here's their gcash account: {review?.userData?.[0]?.gcash}
        </Styles.TipText>
      )} */}
    </Styles.ReviewArticlePageWrapper>
  );
};

type Props = {
  review: ReviewData;
};
export default ReviewArticlePage;
