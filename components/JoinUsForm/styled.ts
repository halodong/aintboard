import styled from "styled-components";

export const InputContainer = styled.div<InputContainerProps>`
  margin-bottom: ${(props) =>
    props.marginbottom ? props.marginbottom : "1.5rem"};
`;

type InputContainerProps = {
  marginbottom?: string;
};
