import { Formik, Form } from "formik";
import Input from "./../Input";
import Label from "./../Label";
import ChooseAvatar from "~/components/Avatar/ChooseAvatar";
import { InputContainer } from "./styled";

const JoinUsForm = () => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      onSubmit={() => {}}
    >
      <Form>
        <Label>Please fill up and submit.</Label>

        <InputContainer>
          <Input name="username" label="Username" />
        </InputContainer>

        <InputContainer>
          <Input name="firstName" label="First Name" />
        </InputContainer>

        <InputContainer>
          <Input name="lastName" label="Last Name" />
        </InputContainer>

        <InputContainer>
          <Input name="email" label="Email" type="email" />
        </InputContainer>

        <InputContainer marginbottom="0">
          <Input name="password" label="Password" type="password" />
        </InputContainer>

        <ChooseAvatar />
      </Form>
    </Formik>
  );
};

export default JoinUsForm;
