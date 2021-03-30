import styled from "styled-components";
import { theme } from "~/styles/theme";

export const InputContainer = styled.div<InputContainerProps>`
  margin-bottom: ${(props) =>
    props.marginbottom ? props.marginbottom : "1.5rem"};
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.errorRed};
  margin-top: 0.5rem;
`;

type InputContainerProps = {
  marginbottom?: string;
};
