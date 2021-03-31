import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./../Input";
import Label from "./../Label";
import ChooseAvatar from "~/components/Avatar/ChooseAvatar";
import Button from "~/components/Button/";
import { InputContainer, ErrorMessage, SignupButton } from "./styled";
import { useState } from "react";

const JoinUsForm = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

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

    password: Yup.string().required("Password is required"),

    passwordConfirmation: Yup.string()
      .required("Confirm Password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  console.log(firstname);
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
              missingFields={username}
              onChange={() => setUsername(errors.username || "")}
            />
          </InputContainer>

          <InputContainer>
            {errors.firstName && touched.firstName && (
              <ErrorMessage>{errors.firstName}</ErrorMessage>
            )}
            <Input
              name="firstName"
              label="First Name"
              missingFields={firstname}
              onChange={() => setFirstname(errors.firstName || "")}
            />
          </InputContainer>

          <InputContainer>
            {errors.lastName && touched.lastName && (
              <ErrorMessage>{errors.lastName}</ErrorMessage>
            )}
            <Input
              name="lastName"
              label="Last Name"
              missingFields={lastName}
              onChange={() => setLastname(errors.lastName || "")}
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
              missingFields={email}
              onChange={() => setEmail(errors.email || "")}
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
              missingFields={password}
              onChange={() => setPassword(errors.password || "")}
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
              missingFields={passwordConfirmation}
              onChange={() => setPasswordConfirmation(errors.password || "")}
            />
          </InputContainer>

          <ChooseAvatar />

          <SignupButton>
            <Button
              bg="lightYellow"
              onClick={() => {
                setUsername(errors.username || "");
                setFirstname(errors.firstName || "");
                setLastname(errors.lastName || "");
                setEmail(errors.email || "");
                setPassword(errors.password || "");
                setPasswordConfirmation(errors.password || "");
              }}
            >
              Join
            </Button>
          </SignupButton>
        </Form>
      )}
    </Formik>
  );
};

export default JoinUsForm;
