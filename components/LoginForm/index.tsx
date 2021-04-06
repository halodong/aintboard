import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

import Input from "~/components/Common/Input";
import Label from "~/components/Common/Label";
import Button from "~/components/Common/Button";

import {
  InputContainer,
  ButtonContainer,
  ErrorMessage,
} from "components/Common/inputStyled";

const LoginForm = ({ closeModal }: Props) => {
  const loginSchema = Yup.object().shape({
    usernameEmail: Yup.string().required("Username or Email Required"),

    password: Yup.string().required("Password Required"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        usernameEmail: "",
        password: "",
      }}
      validationSchema={loginSchema}
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
      {({ errors, touched }) => (
        <Form>
          <Label>Welcome!</Label>

          <InputContainer>
            {errors.usernameEmail && touched.usernameEmail && (
              <ErrorMessage>{errors.usernameEmail}</ErrorMessage>
            )}
            <Input
              name="usernameEmail"
              label="Username/Email"
              error={errors.usernameEmail || ""}
            />
          </InputContainer>

          <InputContainer>
            {errors.password && touched.password && (
              <ErrorMessage>{errors.password}</ErrorMessage>
            )}
            <Input
              name="password"
              label="Password"
              type="password"
              error={errors.password || ""}
            />
          </InputContainer>

          <ButtonContainer>
            <Button bg="lightYellow" onClick={() => {}}>
              Login
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

export default LoginForm;
