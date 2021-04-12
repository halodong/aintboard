import styled from "styled-components";

export const FaqsWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.dark};
  font-family: ${(props) => props.theme.fonts.quicksandReg};
  color: white;
  width: 100%;
`;

export const FaqLinkContainer = styled.div`
  width: 50%;
  margin: auto;
  border: 1px solid white;
  padding: 1rem;

  button {
    font-family: ${(props) => props.theme.fonts.quicksandBold};
    outline: none;
    border: none;
    background: none;
    color: white;
    cursor: pointer;
    width: 100%;
    text-align: left;
  }

  p {
    padding: 0.5rem;
  }
`;
