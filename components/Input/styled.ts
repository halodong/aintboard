import styled from "styled-components";

export const InputContainer = styled.div<InputContainerProps>`
  position: relative;
  min-width: ${(props) => props.minWidth};
  margin: 0 auto;
  width: 30rem;

  .search-icon {
    position: absolute;
    z-index: 1;
    right: 1rem;
    top: 0.7rem;
    cursor: pointer;
  }
`;

type InputContainerProps = {
  minWidth: string;
};

export const InputStyled = styled.input`
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.fonts.quicksandReg};
  border-radius: ${(props) => props.theme.border["10px"]};
  font-size: ${(props) => props.theme.fontSizes.md};
  padding: 1rem 1.5rem;
  border: none;
  outline: none;
  position: relative;
  width: 100%;
  z-index: 0;

  &::placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    color: ${(props) => props.theme.colors.lightGray};
    font-family: ${(props) => props.theme.fonts.quicksandLight};
  }
`;
