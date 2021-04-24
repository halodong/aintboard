import axios from "axios";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { Formik, Form } from "formik";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";

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
import { OnSubmitValidationError } from "util/OnSubmitValidationError";
import { LANGUAGE_OPTIONS, REVIEW_STATUS, REVIEW_TYPE } from "util/constants";

const StrategyForm = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const [strategyContent, setStrategyContent] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const formSchema = Yup.object().shape({
    strategyTitle: Yup.string().required("Review Title required"),
    bgName: Yup.string().required("Boardgame Name required"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        strategyTitle: "",
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
            toast.error("You should be logged in to create a strategy");
            return;
          }

          const uploadedImages = await upload(images);

          const response = await axios.post("/api/reviews/", {
            userId: userData._id,
            username: userData.username,
            bgName: values.bgName,
            content: strategyContent,
            reviewStatus: REVIEW_STATUS.PENDING,
            reviewType: REVIEW_TYPE.STRATEGY,
            images: uploadedImages,
            title: values.strategyTitle,
            language: values.language,
            youtubeUrl: values.youtubeUrl,
          });

          if (!response.data.success) {
            toast.error(response.data.message);
            return;
          }

          resetForm();
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
                error={errors.bgName || ""}
                marginLeft="0"
              />
            </InputContainer>

            <Label>Upload your own images related to your strategy</Label>

            <ImageUpload
              buttonLabel="Choose images"
              multi
              max={3}
              passImagesToParent={(imgs) => setImages(imgs)}
              marginLeft="0"
            />

            <Label>Put your Strategy content here</Label>

            <RTE passContentToParent={setStrategyContent} />

            <Label>What is your Strategy's primary language?</Label>

            <DropDown
              placeholder="Language"
              marginLeft="0"
              options={LANGUAGE_OPTIONS}
              onChange={(selectedOption) =>
                setFieldValue("language", selectedOption.value)
              }
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
