import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Input from "../Common/Input";
import Label from "../Common/Label";
import ChooseAvatar from "~/components/Avatar/ChooseAvatar";
import Button from "~/components/Common/Button";

import { InputContainer, ErrorMessage, SignupButton } from "./styled";

const JoinUsForm = ({ closeModal }: Props) => {
  const [avatar, setAvatar] = useState("");

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Too Short!")
      .max(55, "Too Long!")
      .required("Username Required"),

    email: Yup.string().email("Invalid email").required("Email Required"),

    password: Yup.string()
      .min(8, "Password must have at least 8 characters")
      .required("Password is required"),

    passwordConfirmation: Yup.string()
      .required("Need to confirm Password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={SignupSchema}
      validateOnBlur={true}
      onSubmit={async (values, { resetForm }) => {
        if (avatar === "") {
          toast.error("Choose an Avatar");
          return;
        }

        try {
          const response = await fetch("/api/signup/", {
            method: "POST",
            body: JSON.stringify({
              username: values.username,
              email: values.email,
              password: values.password,
              avatar,
            }),
          });

          const userResponse = await response.json();

          if (!userResponse.success) {
            toast.error(userResponse.message);
            return;
          }

          closeModal();
          resetForm();
          toast.success("You have successfully signed up!");
        } catch (err) {
          console.error("Signup error: ", err);
          toast.error("Something went wrong");
        }
      }}
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

          <ChooseAvatar
            chooseAvatar={(chosenAvatar) => setAvatar(chosenAvatar)}
          />

          <SignupButton>
            <Button bg="lightYellow" type="submit">
              Join
            </Button>
          </SignupButton>
        </Form>
      )}
    </Formik>
  );
};

type Props = {
  closeModal: () => void;
};

export default JoinUsForm;
