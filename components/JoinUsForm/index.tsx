import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";

import Input from "../Common/Input";
import Label from "../Common/Label";
import Button from "~/components/Common/Button";
import ChooseAvatar from "~/components/Avatar/ChooseAvatar";

import {
  InputContainer,
  ErrorMessage,
  ButtonContainer,
} from "components/Common/inputStyled";

const JoinUsForm = ({ closeModal }: Props) => {
  const [avatar, setAvatar] = useState("");

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .matches(/^[0-9a-zA-Z]+$/, "Special characters are not allowed")
      .min(3, "Too Short!")
      .max(55, "Too Long!")
      .required("Username Required"),

    email: Yup.string().email("Invalid email").required("Email Required"),

    // gcash: Yup.number().typeError("Must be a number"),

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
        // gcash: "",
        passwordConfirmation: "",
      }}
      validationSchema={signupSchema}
      validateOnBlur={true}
      onSubmit={async (values, { resetForm }) => {
        if (avatar === "") {
          toast.error("Choose an Avatar");
          return;
        }

        try {
          const userResponse = await axios.post("/api/signup", {
            username: values.username,
            email: values.email,
            password: values.password,
            // gcash: values.gcash,
            avatar,
          });

          if (!userResponse.data.success) {
            toast.error(userResponse.data.message);
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
              error={errors.password && touched.password ? errors.password : ""}
            />
          </InputContainer>

          <InputContainer>
            {errors.passwordConfirmation && touched.passwordConfirmation && (
              <ErrorMessage>{errors.passwordConfirmation}</ErrorMessage>
            )}
            <Input
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              error={
                errors.passwordConfirmation && touched.passwordConfirmation
                  ? errors.passwordConfirmation
                  : ""
              }
            />
          </InputContainer>

          {/* delete for now */}
          {/* <Label>
            You can receive tips from your review and strategy posts!
          </Label>

          <InputContainer>
            {errors.gcash && touched.gcash && (
              <ErrorMessage>{errors.gcash}</ErrorMessage>
            )}
            <Input
              name="gcash"
              label="Gcash number (optional)"
              type="gcash"
              error={errors.gcash && touched.gcash ? errors.gcash : ""}
            />
          </InputContainer> */}

          <ChooseAvatar
            chooseAvatar={(chosenAvatar) => setAvatar(chosenAvatar)}
          />

          <ButtonContainer>
            <Button bg="lightYellow" type="submit">
              Join
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

export default JoinUsForm;
