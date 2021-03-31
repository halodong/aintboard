import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./../Input";
import Label from "./../Label";
import ChooseAvatar from "~/components/Avatar/ChooseAvatar";
import Button from "~/components/Button/";
import { InputContainer, ErrorMessage, SignupButton } from "./styled";
import { useState } from "react";

const JoinUsForm = () => {
  const [missingFields, setMissingFields] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  // const [touchedUsername, setTouchedUsername] = useState(false);
  // const [touchedFirstname, setTouchedFirstname] = useState(false);
  // const [touchedLastname, setTouchedLastname] = useState(false);
  // const [touchedEmail, setTouchedEmail] = useState(false);
  // const [touchedPassword, setTouchedPassword] = useState(false);
  // const [touchedConfirm, setTouchedConfirm] = useState(false);

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Too Short!")
      .max(55, "Too Long!")
      .required("Username Required"),

    firstName: Yup.string()
      .min(4, "Too Short!")
      .max(55, "Too Long!")
      .required("Firstname Required"),

    lastName: Yup.string()
      .min(4, "Too Short!")
      .max(55, "Too Long!")
      .required("Lastname Required"),

    email: Yup.string().email("Invalid email").required("Email Required"),

    password: Yup.string().required("Password is required"),

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
              missingFields={missingFields.username}
            />
          </InputContainer>

          <InputContainer>
            {errors.firstName && touched.firstName && (
              <ErrorMessage>{errors.firstName}</ErrorMessage>
            )}
            <Input
              name="firstName"
              label="First Name"
              missingFields={missingFields.firstName}
            />
          </InputContainer>

          <InputContainer>
            {errors.lastName && touched.lastName && (
              <ErrorMessage>{errors.lastName}</ErrorMessage>
            )}
            <Input
              name="lastName"
              label="Last Name"
              missingFields={missingFields.lastName}
            />
          </InputContainer>

          {console.log(touched)}

          <InputContainer>
            {errors.email && touched.email && (
              <ErrorMessage>{errors.email}</ErrorMessage>
            )}
            <Input
              name="email"
              label="Email"
              type="email"
              missingFields={missingFields.email}
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
              missingFields={missingFields.password}
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
              missingFields={missingFields.passwordConfirmation}
            />
          </InputContainer>

          <ChooseAvatar />

          <SignupButton>
            <Button
              bg="lightYellow"
              onClick={() => {
                setMissingFields({
                  username: errors.username || "",
                  firstName: errors.firstName || "",
                  lastName: errors.lastName || "",
                  email: errors.email || "",
                  password: errors.password || "",
                  passwordConfirmation: errors.passwordConfirmation || "",
                });
                console.log(errors);
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
