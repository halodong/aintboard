import styled from "styled-components";

export const NotFoundWrapper = styled.div`
  text-align: center;
  padding: 2rem;
  color: white;
`;

export const NotFoundH1 = styled.h1`
  font-family: ${(props) => props.theme.fonts.gameFont};
  margin-top: 3rem;
`;

export const NotFoundH2 = styled.h2`
  font-family: ${(props) => props.theme.fonts.rubikBold};
  margin-top: 3rem;
`;
