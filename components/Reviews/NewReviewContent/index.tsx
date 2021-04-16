import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import RatingForm from "components/Common/RatingForm";
import OverallRating from "components/Common/OverallRating";
import { NewReviewWrapper } from "./styled";

const NewReviewContent = () => {
  const [replayabilityRating, setReplayabilityRating] = useState(1);
  const [complexityRating, setComplexityRating] = useState(1);
  const [aestheticsRating, setAestheticsRating] = useState(1);
  const [valueForMoneyRating, setValueForMoneyRating] = useState(1);
  const [playingTimeRating, setPlayingTimeRating] = useState(1);
  const [componentsRating, setComponentsRating] = useState(1);
  const [overallRating, setOverallRating] = useState(1);

  const formSchema = Yup.object().shape({
    reviewTitle: Yup.string().required("Review Title required"),
    language: Yup.string().required("Language required"),
    youtubeUrl: Yup.string().required("Youtube URL required"),
  });

  useEffect(() => {
    const sum =
      replayabilityRating +
      complexityRating +
      complexityRating +
      aestheticsRating +
      valueForMoneyRating +
      playingTimeRating;

    setOverallRating(Math.ceil(sum / 6));
  }, [
    replayabilityRating,
    componentsRating,
    complexityRating,
    aestheticsRating,
    valueForMoneyRating,
    playingTimeRating,
  ]);

  return (
    <NewReviewWrapper>
      <Formik
        enableReinitialize
        initialValues={{
          reviewTitle: "",
          language: "",
          youtubeUrl: "",
        }}
        // validationSchema={formSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log("replayabilityRating", replayabilityRating);
          console.log("complexityRating", complexityRating);
          console.log("aestheticsRating", aestheticsRating);
          console.log("valueForMoneyRating", valueForMoneyRating);
          console.log("playingTimeRating", playingTimeRating);
          console.log("componentsRating", componentsRating);
          // try {
          // } catch (err) {
          //   console.error("Challenge creation error: ", err);
          //   toast.error("Something went wrong");
          // }
        }}
      >
        {() => (
          <Form>
            <label>
              Rate this boardgame by these categories from 1 - 6. 1 being the
              lowest, and 6 being the highest.
            </label>

            <OverallRating label="Overall Rating" rating={overallRating} />
            <RatingForm
              ratingType="Replayability"
              onRatingClick={(rating: number) => setReplayabilityRating(rating)}
            />
            <RatingForm
              ratingType="Complexity"
              onRatingClick={(rating: number) => setComplexityRating(rating)}
            />
            <RatingForm
              ratingType="Aesthetics"
              onRatingClick={(rating: number) => setAestheticsRating(rating)}
            />
            <RatingForm
              ratingType="Value for Money"
              onRatingClick={(rating: number) => setValueForMoneyRating(rating)}
            />
            <RatingForm
              ratingType="Playing Time"
              onRatingClick={(rating: number) => setPlayingTimeRating(rating)}
            />
            <RatingForm
              ratingType="Components Quality"
              onRatingClick={(rating: number) => setComponentsRating(rating)}
            />
            <button type="submit">Submit Review</button>
          </Form>
        )}
      </Formik>
    </NewReviewWrapper>
  );
};

export default NewReviewContent;
