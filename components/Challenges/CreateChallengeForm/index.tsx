import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

import Input from "components/Common/Input";
import Label from "components/Common/Label";
import Button from "components/Common/Button";
import Searchbar from "components/Searchbar";

import { InputContainer, ButtonContainer } from "./styled";
import { CREATE_CHALLENGE_FORM_COMPONENT } from "util/constants";
import { BgState } from "types/types";
import { theme } from "styles/theme";

const CreateChallengeForm = ({ closeModal }: Props) => {
  const bgData = useSelector((state: BgState) => state.bg.bgSearched);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        usernameEmail: "",
        password: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userResponse = await axios.post("/api/login/", {
            username: values.usernameEmail,
            email: values.usernameEmail,
            password: values.password,
          });

          if (!userResponse.data.success) {
            toast.error(userResponse.data.message);
            return;
          }

          closeModal();
          resetForm();
          toast.success("Welcome!");
        } catch (err) {
          console.error("Login error: ", err);
          toast.error("Something went wrong");
        }
      }}
    >
      <Form>
        <Label>Challenges are meant to be achievable and challenging.</Label>

        <InputContainer>
          <Searchbar
            showLinks={false}
            from={CREATE_CHALLENGE_FORM_COMPONENT}
            width="30rem"
            height="3rem"
            inputBgColor={theme.colors.inputDark}
            defaultValue={bgData?.bgName}
          />
        </InputContainer>

        <InputContainer>
          <Input name="password" label="Password" type="password" />
        </InputContainer>
        <ButtonContainer>
          <Button bg="lightYellow" onClick={() => {}}>
            Submit
          </Button>
        </ButtonContainer>
      </Form>
    </Formik>
  );
};

type Props = {
  closeModal: () => void;
};

export default CreateChallengeForm;
