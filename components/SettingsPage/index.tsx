// import * as Yup from "yup";
// import { Formik, Form } from "formik";
// import { toast } from "react-toastify";

// import Input from "../Common/Input";
// import Label from "../Common/Label";

// import {
//   InputContainer,
//   ErrorMessage,
// } from "components/Common/inputStyled";
// import * as DefaultStyles from "components/Common/defaultStyled";

const SettingsPage = () => {
  // const settingsSchema = Yup.object().shape({
  //   gcash: Yup.number().typeError("Must be a number"),
  // });

  return (
    <></>
    // <DefaultStyles.DefaultHeightWrapper
    //   zIndex="7th"
    //   position="relative"
    //   marginTop="-1rem"
    // >
    //   <Formik
    //     enableReinitialize
    //     initialValues={{
    //       gcash: "",
    //     }}
    //     validationSchema={settingsSchema}
    //     validateOnBlur={true}
    //     onSubmit={async (values, { resetForm }) => {
    //       try {
    //         const userResponse = await axios.post("/api/signup", {
    //           username: values.username,
    //           email: values.email,
    //           password: values.password,
    //           gcash: values.gcash,
    //           avatar,
    //         });

    //         if (!userResponse.data.success) {
    //           toast.error(userResponse.data.message);
    //           return;
    //         }

    //         closeModal();
    //         resetForm();
    //         toast.success("You have successfully signed up!");
    //       } catch (err) {
    //         console.error("Signup error: ", err);
    //         toast.error("Something went wrong");
    //       }
    //     }}
    //   >
    //     {({ errors, touched }) => (
    //       <Form>
    //         <Label>Please fill up and submit.</Label>

    //         <Label>
    //           You can receive tips from your review and strategy posts!
    //         </Label>

    //         <InputContainer>
    //           {errors.gcash && touched.gcash && (
    //             <ErrorMessage>{errors.gcash}</ErrorMessage>
    //           )}
    //           <Input
    //             name="gcash"
    //             label="Gcash number (optional)"
    //             type="gcash"
    //             error={errors.gcash && touched.gcash ? errors.gcash : ""}
    //           />
    //         </InputContainer>
    //       </Form>
    //     )}
    //   </Formik>
    // </DefaultStyles.DefaultHeightWrapper>
  );
};

export default SettingsPage;
