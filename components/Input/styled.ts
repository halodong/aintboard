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

  .float-label-input {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 350px;
  }

  .float-label-input .Active {
    transform: translate(0, 0.5rem) scale(0.7);
  }

  .float-label-input input {
    width: 100%;
    height: 3rem;
    outline: 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: white;
    background: ${(props) => props.theme.colors.inputDark};
    font-family: ${(props) => props.theme.fonts.quicksandReg};
    font-size: 1rem;
    padding-top: 2rem;
    padding-left: 1rem;
  }

  .float-label-input label {
    font-size: 1rem;
    font-family: ${(props) => props.theme.fonts.quicksandReg};
    padding: 0 12px;
    color: ${(props) => props.theme.colors.lightGray};
    pointer-events: none;
    position: absolute;
    transform: translate(0, 1rem) scale(1);
    transform-origin: top left;
    transition: all 0.2s ease-out;
  }

  .float-label-input:focus-within label {
    transform: translate(0, 0.5rem) scale(0.7);
  }
`;

type InputContainerProps = {
  minWidth?: string;
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
