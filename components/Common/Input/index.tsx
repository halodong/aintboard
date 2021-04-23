import { useState, useEffect } from "react";
import SearchIcon from "~/assets/img/search.svg";
import { useField, useFormikContext } from "formik";
import { InputStyled, InputContainer } from "./styled";

export default function Input({
  minWidth,
  marginLeft,
  error,
  placeholder,
  name,
  rightIcon,
  showRightIcon,
  label,
  type = "text",
  handleChangeOnParent,
}: Props) {
  const [field, meta] = useField(name);
  const { setFieldValue, submitForm } = useFormikContext();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (field.value !== "") {
      setIsActive(true);
    }
  }, [field.value]);

  const handleTextChange = (text: string) => {
    setFieldValue(name, text);

    //check if this function exists
    if (handleChangeOnParent) {
      handleChangeOnParent(name, text);
    }

    if (text !== "") {
      setIsActive(true);
      return;
    }

    setIsActive(false);
  };

  return (
    <InputContainer minWidth={minWidth} marginLeft={marginLeft} error={error}>
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
  error?: string;
  name: string;
  minWidth?: string;
  marginLeft?: string;
  placeholder?: string;
  rightIcon?: "search";
  showRightIcon?: boolean;
  label?: string;
  type?: string;
  handleChangeOnParent?: (name: string, value: string) => void;
};
