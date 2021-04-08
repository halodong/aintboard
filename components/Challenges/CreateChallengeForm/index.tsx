import { Formik, Form } from "formik";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";

import Input from "components/Common/Input";
import Label from "components/Common/Label";
import Button from "components/Common/Button";
import ImageUpload from "components/Common/ImageUpload";

import {
  InputContainer,
  ButtonContainer,
  ErrorMessage,
} from "components/Common/inputStyled";
import useCurrentUser from "hooks/useCurrentUser";

const CreateChallengeForm = ({ closeModal }: Props) => {
  const user = useCurrentUser();

  const formSchema = Yup.object().shape({
    challengeName: Yup.string()
      .min(10, "It is too short.")
      .required("Challenge Name required"),

    powerUpAmount: Yup.number().required("PowerUp amount required"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        challengeName: "",
        powerUpAmount: "",
      }}
      validationSchema={formSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userData = !isEmpty(user?.userData)
            ? JSON.parse(user?.userData || "")
            : { role: "" };
          const role = userData?.role || "guest";
          const powerUpAmount =
            values.powerUpAmount === "" ? 0 : values.powerUpAmount;

          if (role === "guest" && powerUpAmount > 2) {
            toast.error("You're not allowed to assign more than 2 PowerUps");
            return;
          }

          const response = await axios.post("/api/challenges/", {
            challengeName: values.challengeName,
            powerUpAmount: values.powerUpAmount,
          });

          if (!response.data.success) {
            toast.error(response.data.message);
            return;
          }

          closeModal();
          resetForm();
          toast.success("New challenge added!");
        } catch (err) {
          console.error("Challenge creation error: ", err);
          toast.error("Something went wrong");
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Label>Challenges are meant to be achievable and challenging.</Label>

          <ImageUpload buttonLabel="Select images" multi max={3} />

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
            <Button bg="lightYellow" type="submit">
              Submit
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
