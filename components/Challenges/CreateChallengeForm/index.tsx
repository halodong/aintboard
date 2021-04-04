import { Formik, Form } from "formik";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

import Input from "components/Common/Input";
import Label from "components/Common/Label";
import Button from "components/Common/Button";

import { InputContainer, ButtonContainer } from "./styled";

const CreateChallengeForm = ({ closeModal }: Props) => {
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

          Cookies.set("access_token", userResponse.data.response.data.token);
          Cookies.set(
            "user_data",
            JSON.stringify(userResponse.data.response.data.user)
          );

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
        <Label>Welcome!</Label>

        <InputContainer>
          <Input name="usernameEmail" label="Username/Email" />
        </InputContainer>
        <InputContainer>
          <Input name="password" label="Password" type="password" />
        </InputContainer>
        <ButtonContainer>
          <Button bg="lightYellow" onClick={() => {}}>
            Login
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
