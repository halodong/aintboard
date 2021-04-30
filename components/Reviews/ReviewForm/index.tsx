import axios from "axios";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { Formik, Form } from "formik";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

import { YoutubeContainer } from "../NewReviewContent/styled";

import { upload } from "util/cloudinary";
import useCurrentUser from "hooks/useCurrentUser";
import { ReviewFormState } from "types/reduxTypes";
import { OnSubmitValidationError } from "util/OnSubmitValidationError";
import { LANGUAGE_OPTIONS, REVIEW_STATUS, REVIEW_TYPE } from "util/constants";
import {
  setReviewFormValues,
  resetReviewFormValues,
} from "redux/slices/reviewFormSlice";

const ReviewForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useCurrentUser();

  const formValuesState = useSelector(
    (state: ReviewFormState) => state.reviewForm
  );

  const [overallRating, setOverallRating] = useState("1");
  const [savedContent, setSavedContent] = useState("");
  const {
    replayabilityRating,
    complexityRating,
    aestheticsRating,
    valueForMoneyRating,
    playingTimeRating,
    componentsRating,
    reviewContent,
  } = formValuesState?.reviewFormValues;

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

    const overallRatingVal = (sum / 6).toFixed(1);

    setOverallRating(overallRatingVal);
    handleValueChange("overallRating", overallRatingVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    replayabilityRating,
    componentsRating,
    complexityRating,
    aestheticsRating,
    valueForMoneyRating,
    playingTimeRating,
  ]);

  useEffect(() => {
    const _content = formValuesState?.reviewFormValues?.reviewContent;

    if (_content && _content.length > 0 && _content !== "<p></p>\n") {
      setSavedContent(_content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValueChange = (name: string, value: any) => {
    dispatch(setReviewFormValues({ name, value }));
  };

  const onSetImages = (images: string[]) => {
    handleValueChange("images", images);
  };

  const onSetReviewContent = (content: string) => {
    if (content && content.length > 0 && content !== "<p></p>\n") {
      handleValueChange("reviewContent", content);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        reviewTitle: formValuesState.reviewFormValues.reviewTitle,
        language: formValuesState.reviewFormValues.language,
        youtubeUrl: formValuesState.reviewFormValues.youtubeUrl,
        bgName: formValuesState.reviewFormValues.bgName,
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

          const uploadedImages = await upload(
            formValuesState?.reviewFormValues?.images
          );

          const response = await axios.post("/api/reviews/", {
            userId: userData._id,
            username: userData.username,
            bgName: values.bgName,
            content: reviewContent,
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
            title: values.reviewTitle,
            language: values.language,
            youtubeUrl: values.youtubeUrl,
          });

          if (!response.data.success) {
            toast.error(response.data.message);
            return;
          }

          resetForm();
          dispatch(resetReviewFormValues());
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
            <InputContainer>
              {errors.reviewTitle && touched.reviewTitle && (
                <ErrorMessage justifyContent="flex-start">
                  {errors.reviewTitle}
                </ErrorMessage>
              )}
              <Input
                name="reviewTitle"
                label="Review Title"
                handleChangeOnParent={(name, value) =>
                  handleValueChange(name, value)
                }
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
                handleChangeOnParent={(name, value) =>
                  handleValueChange(name, value)
                }
                marginLeft="0"
              />
            </InputContainer>

            <Label>Upload your own images related to your Review</Label>

            <ImageUpload
              buttonLabel="Choose images"
              multi
              max={3}
              previewImages={formValuesState?.reviewFormValues?.images || []}
              passImagesToParent={(imgs) => onSetImages(imgs)}
              marginLeft="0"
            />

            <Label>Put your Review content here</Label>

            <RTE
              savedContent={savedContent}
              passContentToParent={onSetReviewContent}
            />

            <Label>What is your Review's primary language?</Label>

            <DropDown
              placeholder="Language"
              marginLeft="0"
              selected={formValuesState?.reviewFormValues?.language}
              options={LANGUAGE_OPTIONS}
              onChange={(selectedOption) => {
                setFieldValue("language", selectedOption.value);
                handleValueChange("language", selectedOption.value);
              }}
            />

            <Label>
              Rate this boardgame by these categories from 1 - 6. 1 being the
              lowest, and 6 being the highest.
            </Label>

            <Label marginTop="0">
              * Complexity: 1 being too complex or too easy, 6 being
              well-balanced
              <br />* Playing Time: 1 being too long or too short, 6 being
              well-balanced
            </Label>

            <OverallRating label="Overall Rating" rating={overallRating} />
            <RatingForm
              ratingType="Replayability"
              defaultRating={
                formValuesState?.reviewFormValues?.replayabilityRating || null
              }
              onRatingClick={(rating: number) => {
                handleValueChange("replayabilityRating", rating);
              }}
            />
            <RatingForm
              ratingType="Complexity"
              defaultRating={
                formValuesState?.reviewFormValues?.complexityRating || null
              }
              onRatingClick={(rating: number) => {
                handleValueChange("complexityRating", rating);
              }}
            />
            <RatingForm
              ratingType="Aesthetics"
              defaultRating={
                formValuesState?.reviewFormValues?.aestheticsRating || null
              }
              onRatingClick={(rating: number) => {
                handleValueChange("aestheticsRating", rating);
              }}
            />
            <RatingForm
              ratingType="Value for Money"
              defaultRating={
                formValuesState?.reviewFormValues?.valueForMoneyRating || null
              }
              onRatingClick={(rating: number) => {
                handleValueChange("valueForMoneyRating", rating);
              }}
            />

            <RatingForm
              ratingType="Playing Time"
              defaultRating={
                formValuesState?.reviewFormValues?.playingTimeRating || null
              }
              onRatingClick={(rating: number) => {
                handleValueChange("playingTimeRating", rating);
              }}
            />
            <RatingForm
              ratingType="Components Quality"
              defaultRating={
                formValuesState?.reviewFormValues?.componentsRating || null
              }
              onRatingClick={(rating: number) => {
                handleValueChange("componentsRating", rating);
              }}
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
                handleChangeOnParent={(name, value) =>
                  handleValueChange(name, value)
                }
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

export default ReviewForm;
