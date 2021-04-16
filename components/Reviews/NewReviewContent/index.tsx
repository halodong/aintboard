import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ReactPlayer from "react-player";

import {
  InputContainer,
  ErrorMessage,
  Label,
} from "components/Common/inputStyled";
import RTE from "components/Common/RTE";
import Input from "components/Common/Input";
import DropDown from "components/Common/DropDown";
import RatingForm from "components/Common/RatingForm";
import ImageUpload from "components/Common/ImageUpload";
import OverallRating from "components/Common/OverallRating";
import { NewReviewWrapper, YoutubeContainer, Title } from "./styled";

const options = [
  {
    label: "Filipino",
    value: "filipino",
  },
  {
    label: "English",
    value: "english",
  },
  {
    label: "Taglish",
    value: "taglish",
  },
];

const NewReviewContent = () => {
  const [replayabilityRating, setReplayabilityRating] = useState(1);
  const [complexityRating, setComplexityRating] = useState(1);
  const [aestheticsRating, setAestheticsRating] = useState(1);
  const [valueForMoneyRating, setValueForMoneyRating] = useState(1);
  const [playingTimeRating, setPlayingTimeRating] = useState(1);
  const [componentsRating, setComponentsRating] = useState(1);
  const [overallRating, setOverallRating] = useState(1);
  const [images, setImages] = useState<string[]>([]);

  const formSchema = Yup.object().shape({
    reviewTitle: Yup.string().required("Review Title required"),
    // language: Yup.string().required("Language required"),
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
        validationSchema={formSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log("replayabilityRating", replayabilityRating);
          console.log("complexityRating", complexityRating);
          console.log("aestheticsRating", aestheticsRating);
          console.log("valueForMoneyRating", valueForMoneyRating);
          console.log("playingTimeRating", playingTimeRating);
          console.log("componentsRating", componentsRating);
          console.log(12, images);
          // try {
          // } catch (err) {
          //   console.error("Challenge creation error: ", err);
          //   toast.error("Something went wrong");
          // }
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <Title>Create a Review</Title>
            <InputContainer>
              {errors.reviewTitle && touched.reviewTitle && (
                <ErrorMessage justifyContent="flex-start">
                  {errors.reviewTitle}
                </ErrorMessage>
              )}
              <Input
                name="reviewTitle"
                label="Review Title"
                error={errors.reviewTitle || ""}
                marginLeft="0"
              />
            </InputContainer>

            <ImageUpload
              buttonLabel="Can upload up to 3 images"
              multi
              max={3}
              passImagesToParent={(imgs) => setImages(imgs)}
              marginLeft="0"
            />

            <Label>What is your Review's primary language?</Label>

            <DropDown
              placeholder="Language"
              options={options}
              onChange={() => {}}
            />

            <Label>
              Rate this boardgame by these categories from 1 - 6. 1 being the
              lowest, and 6 being the highest.
            </Label>

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

            <Label>Put your Review content here</Label>

            <RTE />

            <Label>
              Upload a youtube link that could be your elaborate video about
              your review
            </Label>
            <InputContainer>
              {errors.youtubeUrl && touched.youtubeUrl && (
                <ErrorMessage justifyContent="flex-start">
                  {errors.youtubeUrl}
                </ErrorMessage>
              )}
              <Input
                name="youtubeUrl"
                label="Youtube URL (optional)"
                error={errors.youtubeUrl || ""}
                marginLeft="0"
              />
            </InputContainer>

            <YoutubeContainer>
              <div className="label">Youtube Video will be here</div>
              <ReactPlayer url={values.youtubeUrl} width="40rem" />
            </YoutubeContainer>

            <button type="submit">Submit Review</button>
          </Form>
        )}
      </Formik>
    </NewReviewWrapper>
  );
};

export default NewReviewContent;
