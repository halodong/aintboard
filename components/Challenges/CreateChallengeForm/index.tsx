import useSWR, { mutate } from "swr";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";

import Input from "components/Common/Input";
import Label from "components/Common/Label";
import Button from "components/Common/Button";
import ImageUpload from "components/Common/ImageUpload";
import {
  InputContainer,
  ButtonContainer,
  ErrorMessage,
} from "components/Common/inputStyled";

import fetcher from "util/fetch";
import { upload } from "util/cloudinary";
import { UserApiResponse } from "types/types";
import useCurrentUser from "hooks/useCurrentUser";
import { CHALLENGE_STATUS } from "util/constants";

const CreateChallengeForm = ({ closeModal }: Props) => {
  const user = useCurrentUser();
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formSchema = Yup.object().shape({
    bgName: Yup.string().required("Boardgame Name required"),

    bgYear: Yup.number().typeError("Must be a number"),

    challengeName: Yup.string()
      .min(5, "It is too short.")
      .required("Challenge Name required"),

    powerUpAmount: Yup.number().required("PowerUp amount required"),
  });

  const userData = user?.userData ? JSON.parse(user?.userData) : {};

  const { data: userApiData } = useSWR<UserApiResponse>(
    userData?._id ? `/api/user/filter/_id/${userData?._id}` : null,
    fetcher
  );

  const userObj = userApiData?.response?.data?.users?.[0];

  return (
    <Formik
      enableReinitialize
      initialValues={{
        bgName: "",
        bgYear: "",
        challengeName: "",
        powerUpAmount: "",
      }}
      validationSchema={formSchema}
      onSubmit={async (values, { resetForm }) => {
        setIsSubmitting(true);
        try {
          if (images.length < 1) {
            toast.error("You need to upload an image");
            setIsSubmitting(false);
            return;
          }

          const powerUpAmount =
            values.powerUpAmount === "" ? 0 : values.powerUpAmount;

          if (userObj?.role === "guest" && powerUpAmount > 2) {
            toast.error("You're not allowed to assign more than 2 PowerUps");
            setIsSubmitting(false);
            return;
          }

          if (
            ["admin", "community_manager"].includes(userObj?.role || "") &&
            powerUpAmount > 5
          ) {
            toast.error("Max is 5 PowerUps");
            setIsSubmitting(false);
            return;
          }

          const uploadedImage = await upload(images);

          const response = await axios.post("/api/challenges/", {
            createdBy: userData._id,
            bgName: values.bgName,
            bgYear: values.bgYear,
            challengeName: values.challengeName,
            powerUpAmount: values.powerUpAmount,
            bgImage: uploadedImage[0],
            status: CHALLENGE_STATUS.PENDING,
          });

          if (!response.data.success) {
            toast.error(response.data.message);
            setIsSubmitting(false);
            return;
          }
          closeModal();
          resetForm();
          mutate(`/api/review/filter/userId/${userObj?._id}`);
          mutate(`/api/challenge/filter/createdBy/${userObj?._id}`);
          mutate(`/api/online-battles/filter/createdBy/${userObj?._id}`);
          toast.success("New challenge added!");
        } catch (err) {
          console.log(err);
          console.error("Challenge creation error: ", err);
          toast.error("Something went wrong");
          setIsSubmitting(false);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Label>Challenges are meant to be achievable and challenging.</Label>
          <Label>
            Challenge Names could be: Finish Pandemic in an hour in a 2-player
            game.
          </Label>
          <Label>
            Images from any website is prohibited. Please upload your own
            images. Make sure it's good quality too :)
          </Label>

          <ImageUpload
            buttonLabel="Upload an image of the boardgame"
            multi
            max={1}
            passImagesToParent={(imgs) => setImages(imgs)}
          />

          <InputContainer>
            {errors.bgName && touched.bgName && (
              <ErrorMessage>{errors.bgName}</ErrorMessage>
            )}
            <Input
              name="bgName"
              label="Boardgame Name"
              error={errors.bgName || ""}
            />
          </InputContainer>

          <InputContainer>
            {errors.bgYear && touched.bgYear && (
              <ErrorMessage>{errors.bgYear}</ErrorMessage>
            )}
            <Input
              name="bgYear"
              label="Boardgame Year (optional)"
              error={errors.bgYear || ""}
            />
          </InputContainer>

          <InputContainer>
            {errors.challengeName && touched.challengeName && (
              <ErrorMessage>{errors.challengeName}</ErrorMessage>
            )}
            <Input
              name="challengeName"
              label="Challenge Name"
              error={errors.challengeName || ""}
            />
          </InputContainer>

          <InputContainer>
            {errors.powerUpAmount && touched.powerUpAmount && (
              <ErrorMessage>{errors.powerUpAmount}</ErrorMessage>
            )}
            <Input
              name="powerUpAmount"
              label="Power Up Amount"
              type="number"
              error={errors.powerUpAmount || ""}
            />
          </InputContainer>

          <ButtonContainer>
            <Button bg="lightYellow" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submiting" : "Submit"}
            </Button>
          </ButtonContainer>
        </Form>
      )}
    </Formik>
  );
};

type Props = {
  closeModal: () => void;
};

export default CreateChallengeForm;
