import styled from "styled-components";

export const CardButtonContainer = styled.div`
  width: 18rem;
  height: 12rem;
  background: rgba(53, 53, 53, 0.5);
  backdrop-filter: blur(40px);
  border-radius: ${(props) => props.theme.border["10px"]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  padding: 2rem;
  cursor: pointer;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    height: 5rem;

    svg {
      display: none;
    }
  }
`;

export const CardTitle = styled.h4`
  font-family: ${(props) => props.theme.fonts.gameFont};
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  line-height: 2rem;
  margin: 0;
`;
