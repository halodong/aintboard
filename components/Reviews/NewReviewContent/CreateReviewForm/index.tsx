import axios from "axios";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { Formik, Form } from "formik";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import {
  InputContainer,
  ErrorMessage,
  ButtonContainer,
  Label,
} from "components/Common/inputStyled";
import RTE from "components/Common/RTE";
import Input from "components/Common/Input";
import Button from "components/Common/Button";
import DropDown from "components/Common/DropDown";
import RatingForm from "components/Common/RatingForm";
import ImageUpload from "components/Common/ImageUpload";
import OverallRating from "components/Common/OverallRating";

import { YoutubeContainer, Title } from "./../styled";

import { upload } from "util/cloudinary";
import { LANGUAGE_OPTIONS, REVIEW_STATUS, REVIEW_TYPE } from "util/constants";
import useCurrentUser from "hooks/useCurrentUser";
import { OnSubmitValidationError } from "util/OnSubmitValidationError";

const CreateReviewForm = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const [replayabilityRating, setReplayabilityRating] = useState(1);
  const [complexityRating, setComplexityRating] = useState(1);
  const [aestheticsRating, setAestheticsRating] = useState(1);
  const [valueForMoneyRating, setValueForMoneyRating] = useState(1);
  const [playingTimeRating, setPlayingTimeRating] = useState(1);
  const [componentsRating, setComponentsRating] = useState(1);
  const [overallRating, setOverallRating] = useState("1");
  const [reviewContent, setReviewContent] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const formSchema = Yup.object().shape({
    reviewTitle: Yup.string().required("Review Title required"),
    bgName: Yup.string().required("Boardgame Name required"),
  });

  useEffect(() => {
    const sum =
      replayabilityRating +
      complexityRating +
      complexityRating +
      aestheticsRating +
      valueForMoneyRating +
      playingTimeRating;

    setOverallRating((sum / 6).toFixed(1));
  }, [
    replayabilityRating,
    componentsRating,
    complexityRating,
    aestheticsRating,
    valueForMoneyRating,
    playingTimeRating,
  ]);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        reviewTitle: "",
        language: "",
        youtubeUrl: "",
        bgName: "",
      }}
      validationSchema={formSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userData = !isEmpty(user?.userData)
            ? JSON.parse(user?.userData || "")
            : "";

          if (userData === "") {
            toast.error("You should be logged in to create a review");
            return;
          }

          const uploadedImages = await upload(images);

          const response = await axios.post("/api/reviews/", {
            userId: userData._id,
            username: userData.username,
            bgName: values.bgName,
            reviewContent: reviewContent,
            reviewStatus: REVIEW_STATUS.PENDING,
            reviewType: REVIEW_TYPE.REVIEW,
            replayabilityRating,
            componentsRating,
            complexityRating,
            aestheticsRating,
            valueForMoneyRating,
            playingTimeRating,
            overallRating,
            images: uploadedImages,
            reviewTitle: values.reviewTitle,
            language: values.language,
            youtubeUrl: values.youtubeUrl,
          });

          if (!response.data.success) {
            toast.error(response.data.message);
            return;
          }

          resetForm();
          toast.success("New review added!");
          router.push("/");
        } catch (err) {
          console.error("Review creation error: ", err);
          toast.error("Something went wrong");
        }
      }}
    >
      {({ errors, touched, values, setFieldValue }) => {
        const onSubmitValidationError = () => {
          toast.error("Please review field errors in the form.");
        };

        return (
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

            <InputContainer>
              {errors.bgName && touched.bgName && (
                <ErrorMessage justifyContent="flex-start">
                  {errors.bgName}
                </ErrorMessage>
              )}
              <Input
                name="bgName"
                label="Boardgame Name"
                error={errors.bgName || ""}
                marginLeft="0"
              />
            </InputContainer>

            <Label>Upload your own images related to your review</Label>

            <ImageUpload
              buttonLabel="Choose images"
              multi
              max={3}
              passImagesToParent={(imgs) => setImages(imgs)}
              marginLeft="0"
            />

            <Label>Put your Review content here</Label>

            <RTE passContentToParent={setReviewContent} />

            <Label>What is your Review's primary language?</Label>

            <DropDown
              placeholder="Language"
              marginLeft="0"
              options={LANGUAGE_OPTIONS}
              onChange={(selectedOption) =>
                setFieldValue("language", selectedOption.value)
              }
            />

            <Label>
              Rate this boardgame by these categories from 1 - 6. 1 being the
              lowest, and 6 being the highest.
            </Label>

            <Label marginTop="0">
              * Complexity: 1 being too complex <br />* Playing Time: 1 being
              too long or too short
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
              {values.youtubeUrl.length > 0 &&
                isNaN(parseInt(values.youtubeUrl)) && (
                  <ReactPlayer url={values.youtubeUrl} width="40rem" />
                )}
            </YoutubeContainer>

            <ButtonContainer justifyContent="flex-start" marginTop="2rem">
              <Button bg="lightYellow" type="submit">
                Submit Review
              </Button>
            </ButtonContainer>

            <OnSubmitValidationError callback={onSubmitValidationError} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateReviewForm;
