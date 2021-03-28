import { useState } from "react";
import { InputStyled, InputContainer } from "./styled";
import SearchIcon from "~/assets/img/search.svg";
import { useField, useFormikContext } from "formik";

export default function Input({
  minWidth,
  placeholder,
  name,
  rightIcon,
  showRightIcon,
  label,
}: Props) {
  const [field, meta] = useField(name);
  const { setFieldValue, submitForm } = useFormikContext();
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");

  const handleTextChange = (text: string) => {
    console.log(33, text);
    setFieldValue(name, text);

    if (text !== "") {
      setIsActive(true);
      return;
    }

    setIsActive(false);
  };

  return (
    <InputContainer minWidth={minWidth}>
      {showRightIcon && rightIcon === "search" && (
        <SearchIcon
          className="search-icon"
          onClick={() => {
            setFieldValue(name, meta.value);
            submitForm();
          }}
        />
      )}
      {label && (
        <div className="float-label-input">
          <InputStyled
            placeholder={placeholder}
            {...field}
            {...meta}
            onChange={(e) => handleTextChange(e.target.value)}
          ></InputStyled>
          <label htmlFor={name} className={isActive ? "Active" : ""}>
            {label}
          </label>
        </div>
      )}
      {!label && (
        <InputStyled
          placeholder={placeholder}
          {...field}
          {...meta}
        ></InputStyled>
      )}
    </InputContainer>
  );
}

type Props = {
  name: string;
  minWidth?: string;
  placeholder?: string;
  rightIcon?: "search";
  showRightIcon?: boolean;
  label?: string;
};
