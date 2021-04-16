import styled from "styled-components";
import { theme } from "~/styles/theme";

export const InputContainer = styled.div<InputContainerProps>`
  margin-bottom: ${(props) =>
    props.marginbottom ? props.marginbottom : "1.5rem"};
`;

type InputContainerProps = {
  marginbottom?: string;
};

export const ErrorMessage = styled.div<ErrorMessageProps>`
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-end"};
  color: ${theme.colors.errorRed};
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
`;

type ErrorMessageProps = {
  justifyContent?: string;
};

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Label = styled.label`
  display: block;
  color: white;
  margin-bottom: 1rem;
`;
