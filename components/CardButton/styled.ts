import styled from "styled-components";

export const CardButtonContainer = styled.div`
  height: 12rem;
  width: 20rem;
  background: rgba(53, 53, 53, 0.5);
  backdrop-filter: blur(40px);
  border-radius: ${(props) => props.theme.border["10px"]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  cursor: pointer;
`;

export const CardTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.gameFont};
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  padding: 0 1rem;
  line-height: 2rem;
`;
