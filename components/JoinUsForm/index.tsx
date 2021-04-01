import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./../Input";
import Label from "./../Label";
import ChooseAvatar from "~/components/Avatar/ChooseAvatar";
import Button from "~/components/Button/";
import { InputContainer, ErrorMessage, SignupButton } from "./styled";

const JoinUsForm = () => {
  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Too Short!")
      .max(55, "Too Long!")
      .required("Username Required"),

    firstName: Yup.string()
      .min(3, "Too Short!")
      .max(55, "Too Long!")
      .required("Firstname Required"),

    lastName: Yup.string()
      .min(3, "Too Short!")
      .max(55, "Too Long!")
      .required("Lastname Required"),

    email: Yup.string().email("Invalid email").required("Email Required"),

    password: Yup.string()
      .min(8, "Password must have at least 8 characters")
      .required("Password is required"),

    passwordConfirmation: Yup.string()
      .required("Confirm Password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={SignupSchema}
      validateOnBlur={true}
      onSubmit={(values) => {}}
    >
      {({ errors, touched }) => (
        <Form>
          <Label>Please fill up and submit.</Label>

          <InputContainer>
            {errors.username && touched.username && (
              <ErrorMessage>{errors.username}</ErrorMessage>
            )}
            <Input
              name="username"
              label="Username"
              error={errors.username || ""}
            />
          </InputContainer>

          <InputContainer>
            {errors.firstName && touched.firstName && (
              <ErrorMessage>{errors.firstName}</ErrorMessage>
            )}
            <Input
              name="firstName"
              label="First Name"
              error={errors.firstName || ""}
            />
          </InputContainer>

          <InputContainer>
            {errors.lastName && touched.lastName && (
              <ErrorMessage>{errors.lastName}</ErrorMessage>
            )}
            <Input
              name="lastName"
              label="Last Name"
              error={errors.lastName || ""}
            />
          </InputContainer>

          <InputContainer>
            {errors.email && touched.email && (
              <ErrorMessage>{errors.email}</ErrorMessage>
            )}
            <Input
              name="email"
              label="Email"
              type="email"
              error={errors.email || ""}
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

          <InputContainer marginbottom="0">
            {errors.passwordConfirmation && touched.passwordConfirmation && (
              <ErrorMessage>{errors.passwordConfirmation}</ErrorMessage>
            )}
            <Input
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              error={errors.passwordConfirmation || ""}
            />
          </InputContainer>

          <ChooseAvatar />

          <SignupButton>
            <Button bg="lightYellow" onClick={() => {}}>
              Join
            </Button>
          </SignupButton>
        </Form>
      )}
    </Formik>
  );
};

export default JoinUsForm;
