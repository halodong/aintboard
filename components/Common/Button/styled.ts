import styled from "styled-components";

export const ButtonStyled = styled.button<ButtonStyledProps>`
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.lightGray
      : props.theme.colors[props.bg]};
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.fonts.rubikReg};
  border-radius: ${(props) => props.theme.border["10px"]};
  font-size: ${(props) => props.theme.fontSizes.xl};
  min-width: 10rem;
  padding: 0.5rem;
  outline: none;
  border: none;
  cursor: ${(props) =>
    props.disabled || props.noPointer ? "auto" : "pointer"};
  text-transform: capitalize;

  &:hover {
    box-shadow: ${(props) =>
      props.disabled ? "none" : "3px 3px 7px rgba(0, 0, 0, 0.8)"};
  }
`;

type ButtonStyledProps = {
  bg: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  noPointer?: boolean;
};
