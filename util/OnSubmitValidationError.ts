import { useEffect } from "react";
import { connect } from "formik";

const OnSubmitValidationErrorComponent = (props: any) => {
  const { callback, formik } = props;

  const effect = () => {
    if (formik.submitCount > 0 && !formik.isSubmitting && !formik.isValid) {
      callback(formik);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [formik.submitCount, formik.isSubmitting]);

  return null;
};

export const OnSubmitValidationError = connect(
  OnSubmitValidationErrorComponent
);
