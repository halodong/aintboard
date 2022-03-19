import axios from "axios";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import Input from "components/Common/Input";
import Label from "components/Common/Label";
import Button from "components/Common/Button";

import {
  InputContainer,
  ButtonContainer,
  ErrorMessage,
} from "components/Common/inputStyled";
import useCurrentUser from "hooks/useCurrentUser";
import { ModalState } from "types/reduxTypes";

const SubmitEntryForm = ({ closeModal }: Props) => {
  const user = useCurrentUser();

  const formSchema = Yup.object().shape({
    score: Yup.string().required("Score required"),
    googleLink: Yup.string().required("Google Drive Link required"),
  });

  const battleId = useSelector(
    (state: ModalState) => state.modal.battleEntryId
  );

  return (
    <Formik
      enableReinitialize
      initialValues={{
        score: "",
        googleLink: "",
        message: "",
      }}
      validationSchema={formSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userData = !isEmpty(user?.userData)
            ? JSON.parse(user?.userData || "")
            : { role: "" };

          const response = await axios.post("/api/online-battle/entry", {
            userId: userData._id,
            battleId,
            score: values.score,
            message: values.message,
            googleLink: values.googleLink,
          });

          if (!response.data.entry.success) {
            toast.error(response.data.entry.message);
            return;
          }

          closeModal();
          resetForm();
          toast.success("Your entry has been submitted!");
        } catch (err) {
          console.error("Submit entry error: ", err);
          toast.error("Something went wrong");
        }
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Label>
            Online Battles are joined by users to play a particular boardgame
            either in a real or online boardgame. At the end of the event, top 3
            users are awarded with trophies.
          </Label>

          <InputContainer>
            {errors.score && touched.score && (
              <ErrorMessage>{errors.score}</ErrorMessage>
            )}
            <Input name="score" label="Score" error={errors.score || ""} />
          </InputContainer>

          <InputContainer>
            {errors.message && touched.message && (
              <ErrorMessage>{errors.message}</ErrorMessage>
            )}
            <Input
              name="message"
              label="Message (optional)"
              error={errors.message || ""}
            />
          </InputContainer>

          <InputContainer>
            {errors.googleLink && touched.googleLink && (
              <ErrorMessage>{errors.googleLink}</ErrorMessage>
            )}
            <Input
              name="googleLink"
              label="Google Drive Link (this is for us to verify your score)"
              error={errors.googleLink || ""}
            />
          </InputContainer>

          <ButtonContainer>
            <Button bg="lightYellow" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting" : "Submit"}
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

export default SubmitEntryForm;
