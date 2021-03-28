import { Formik, Form } from "formik";
import Input from "./../Input";
import { MainLabel } from "./styled";

const JoinUsForm = () => {
  return (
    <Formik
      initialValues={{
        username: "",
      }}
      onSubmit={() => {}}
    >
      <Form>
        <MainLabel>Please fill up and submit.</MainLabel>

        <Input name="username" label="Username" />
      </Form>
    </Formik>
  );
};

export default JoinUsForm;
