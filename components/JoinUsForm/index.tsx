import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./../Input";
import Label from "./../Label";
import ChooseAvatar from "~/components/Avatar/ChooseAvatar";
import Button from "~/components/Button/";
import { InputContainer, ErrorMessage } from "./styled";

const JoinUsForm = () => {
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
  });
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Label>Please fill up and submit.</Label>

            <InputContainer>
              <Input name="username" label="Username" />
              {errors.username && touched.username && (
                <ErrorMessage>
                  <ul>{errors.username}</ul>
                </ErrorMessage>
              )}
            </InputContainer>

            <InputContainer>
              <Input name="firstName" label="First Name" />
              {errors.firstName && touched.firstName && (
                <ErrorMessage>
                  <ul>{errors.firstName}</ul>
                </ErrorMessage>
              )}
            </InputContainer>

            <InputContainer>
              <Input name="lastName" label="Last Name" />
              {errors.lastName && touched.lastName && (
                <ErrorMessage>
                  <ul>{errors.lastName}</ul>
                </ErrorMessage>
              )}
            </InputContainer>

            <InputContainer>
              <Input name="email" label="Email" type="email" />
              {errors.email && touched.email && (
                <ErrorMessage>
                  <ul>{errors.email}</ul>
                </ErrorMessage>
              )}
            </InputContainer>

            <InputContainer marginbottom="0">
              <Input name="password" label="Password" type="password" />
            </InputContainer>

            <ChooseAvatar />

            <Button
              bg="lightYellow"
              onClick={() => console.log("Welcome Home")}
            >
              Join
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default JoinUsForm;

// <Form>
//           <Label>Please fill up and submit.</Label>

//           <InputContainer>
//             <Input name="username" label="Username" />
//           </InputContainer>

//           <InputContainer>
//             <Input name="firstName" label="First Name" />
//           </InputContainer>

//           <InputContainer>
//             <Input name="lastName" label="Last Name" />
//           </InputContainer>

//           <InputContainer>
//             <Input name="email" label="Email" type="email" />
//           </InputContainer>

//           <InputContainer marginbottom="0">
//             <Input name="password" label="Password" type="password" />
//           </InputContainer>

//           <ChooseAvatar />
//         </Form>
