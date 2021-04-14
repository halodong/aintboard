import { Formik, Form } from "formik";
import * as Yup from "yup";

import { NewPageWrapper } from "./styled";

const NewReviewContent = () => {
  const formSchema = Yup.object().shape({
    reviewTitle: Yup.string().required("Review Title required"),
    language: Yup.string().required("Language required"),
    youtubeUrl: Yup.string().required("Youtube URL required"),
  });

  return (
    <NewPageWrapper>
      <Formik
        enableReinitialize
        initialValues={{
          reviewTitle: "",
          language: "",
          youtubeUrl: "",
        }}
        validationSchema={formSchema}
        onSubmit={async (values, { resetForm }) => {
          // try {
          // } catch (err) {
          //   console.error("Challenge creation error: ", err);
          //   toast.error("Something went wrong");
          // }
        }}
      >
        {() => <Form></Form>}
      </Formik>
    </NewPageWrapper>
  );
};

export default NewReviewContent;
