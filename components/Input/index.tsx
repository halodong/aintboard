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
  type = "text",
}: Props) {
  const [field, meta] = useField(name);
  const { setFieldValue, submitForm } = useFormikContext();
  const [isActive, setIsActive] = useState(false);

  const handleTextChange = (text: string) => {
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
            type={type}
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
          type={type}
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
  type?: string;
};
