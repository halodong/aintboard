import { InputStyled, InputContainer } from "./styled";

export default function Input({ minWidth, placeholder, rightIcon }: Props) {
  return (
    <InputContainer>
      {rightIcon}
      <InputStyled minWidth={minWidth} placeholder={placeholder}></InputStyled>
    </InputContainer>
  );
}

type Props = {
  minWidth: string;
  placeholder: string;
  rightIcon?: React.ReactNode;
};
