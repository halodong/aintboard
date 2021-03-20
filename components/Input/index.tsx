import { InputStyled, InputContainer } from "./styled";
import { Search } from "~/assets/img";
import { useField, useFormikContext } from "formik";

export default function Input({
  minWidth,
  placeholder,
  name,
  rightIcon,
  showRightIcon,
}: Props) {
  const [field, meta] = useField(name);
  const { setFieldValue, submitForm } = useFormikContext();

  return (
    <InputContainer minWidth={minWidth}>
      {showRightIcon && rightIcon === "search" && (
        <Search
          className="search-icon"
          onClick={() => {
            setFieldValue(name, meta.value);
            submitForm();
          }}
        />
      )}
      <InputStyled placeholder={placeholder} {...field} {...meta}></InputStyled>
    </InputContainer>
  );
}

type Props = {
  minWidth: string;
  placeholder: string;
  rightIcon?: "search";
  showRightIcon?: boolean;
  name: string;
};
