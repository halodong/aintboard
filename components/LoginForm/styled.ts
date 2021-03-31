import styled from "styled-components";

export const InputContainer = styled.div<InputContainerProps>`
  margin-bottom: ${(props) =>
    props.marginbottom ? props.marginbottom : "1.5rem"};
`;

type InputContainerProps = {
  marginbottom?: string;
};

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
