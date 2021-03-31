import { Formik, Form } from "formik";
import Input from "./../Input";
import Label from "./../Label";
import Button from "~/components/Button";

import { InputContainer, ButtonContainer } from "./styled";

const LoginForm = () => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        usernameEmail: "",
        password: "",
      }}
      onSubmit={() => {}}
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

export default LoginForm;
