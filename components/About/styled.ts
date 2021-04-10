import styled from "styled-components";

export const AboutWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.dark};
  font-family: ${(props) => props.theme.fonts.quicksandReg};
  color: white;
  padding: 0 2rem 2rem 2rem;
  text-align: center;

  p {
    margin: 0 auto;
    width: 50%;
    display: block;
  }
`;
