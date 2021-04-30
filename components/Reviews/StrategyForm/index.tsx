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
import ImageUpload from "components/Common/ImageUpload";

import { YoutubeContainer } from "../NewReviewContent/styled";

import { upload } from "util/cloudinary";
import useCurrentUser from "hooks/useCurrentUser";
import { StrategyFormState } from "types/reduxTypes";
import { OnSubmitValidationError } from "util/OnSubmitValidationError";
import { LANGUAGE_OPTIONS, REVIEW_STATUS, REVIEW_TYPE } from "util/constants";
import {
  setStrategyFormValues,
  resetStrategyFormValues,
} from "redux/slices/strategyFormSlice";

const StrategyForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const [savedContent, setSavedContent] = useState("");

  const formValuesState = useSelector(
    (state: StrategyFormState) => state.strategyForm
  );

  useEffect(() => {
    const _content = formValuesState?.strategyFormValues?.strategyContent;
    if (_content && _content.length > 0) {
      setSavedContent(_content);
    } else {
      setSavedContent("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValueChange = (name: string, value: any) => {
    dispatch(setStrategyFormValues({ name, value }));
  };

  const onSetImages = (images: string[]) => {
    handleValueChange("images", images);
  };

  const onSetStrategyContent = (content: string) => {
    if (content && content.length > 0 && content !== "<p></p>\n") {
      handleValueChange("strategyContent", content);
    }
  };

  const formSchema = Yup.object().shape({
    strategyTitle: Yup.string().required("Review Title required"),
    bgName: Yup.string().required("Boardgame Name required"),
  });

  const {
    strategyTitle,
    language,
    youtubeUrl,
    bgName,
  } = formValuesState?.strategyFormValues;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        strategyTitle,
        language,
        youtubeUrl,
        bgName,
      }}
      validationSchema={formSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userData = !isEmpty(user?.userData)
            ? JSON.parse(user?.userData || "")
            : "";

          if (userData === "") {
            toast.error("You should be logged in to create a strategy");
            return;
          }

          const uploadedImages = await upload(
            formValuesState?.strategyFormValues?.images
          );

          const response = await axios.post("/api/reviews/", {
            userId: userData._id,
            username: userData.username,
            bgName: values.bgName,
            content: formValuesState?.strategyFormValues?.strategyContent,
            reviewStatus: REVIEW_STATUS.PENDING,
            reviewType: REVIEW_TYPE.STRATEGY,
            images: uploadedImages,
            title: strategyTitle,
            language: values.language,
            youtubeUrl: values.youtubeUrl,
          });

          if (!response.data.success) {
            toast.error(response.data.message);
            return;
          }

          resetForm();
          dispatch(resetStrategyFormValues());
          toast.success("New strategy added!");
          router.push("/");
        } catch (err) {
          console.error("Strategy creation error: ", err);
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
              {errors.strategyTitle && touched.strategyTitle && (
                <ErrorMessage justifyContent="flex-start">
                  {errors.strategyTitle}
                </ErrorMessage>
              )}
              <Input
                name="strategyTitle"
                label="Strategy Title"
                handleChangeOnParent={(name, value) =>
                  handleValueChange(name, value)
                }
                error={errors.strategyTitle || ""}
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
                handleChangeOnParent={(name, value) =>
                  handleValueChange(name, value)
                }
                error={errors.bgName || ""}
                marginLeft="0"
              />
            </InputContainer>

            <Label>Upload your own images related to your strategy</Label>

            <ImageUpload
              buttonLabel="Choose images"
              multi
              max={3}
              previewImages={formValuesState?.strategyFormValues?.images || []}
              passImagesToParent={(imgs) => onSetImages(imgs)}
              marginLeft="0"
            />

            <Label>Put your Strategy content here</Label>

            <RTE
              savedContent={savedContent}
              passContentToParent={onSetStrategyContent}
            />

            <Label>What is your Strategy's primary language?</Label>

            <DropDown
              placeholder="Language"
              marginLeft="0"
              selected={formValuesState?.strategyFormValues?.language}
              options={LANGUAGE_OPTIONS}
              onChange={(selectedOption) => {
                setFieldValue("language", selectedOption.value);
                handleValueChange("language", selectedOption.value);
              }}
            />

            <Label>
              Upload a youtube link that could be your elaborate video about
              your strategy
            </Label>
            <InputContainer>
              {errors.youtubeUrl && touched.youtubeUrl && (
                <ErrorMessage justifyContent="flex-start">
                  {errors.youtubeUrl}
                </ErrorMessage>
              )}
              <Input
                name="youtubeUrl"
                handleChangeOnParent={(name, value) =>
                  handleValueChange(name, value)
                }
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
                Submit Strategy
              </Button>
            </ButtonContainer>

            <OnSubmitValidationError callback={onSubmitValidationError} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default StrategyForm;
