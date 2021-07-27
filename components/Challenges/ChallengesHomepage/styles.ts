import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #234c4c;
  min-height: 51.875rem;
  padding-bottom: 2rem;

  .slogan {
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    font-size: 20px;
    font-weight: bold;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    height: auto;

    .slogan {
      padding: 0.2rem;
    }
  }
`;

export const GameFont = styled.h1`
  font-family: ${(props) => props.theme.fonts.gameFont};
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  padding-top: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 75%;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
  }

  /* display: flex;
  flex-wrap: wrap;
  justify-items: center;
  align-items: center;
  gap: 3rem; */
`;

export const CallToAction = styled.div`
  position: relative;
  background: rgba(53, 53, 53, 0.5);
  backdrop-filter: blur(40px);
  height: 15rem;
  width: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.border["10px"]};
  cursor: pointer;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    margin-top: 1rem;
    height: 12rem;
    width: 20rem;
  }

  @media (min-width: ${(props) =>
      props.theme.breakpoints.sm}) and (max-width: ${(props) =>
      props.theme.breakpoints.md}) {
    width: 25rem;
  }
`;

export const CallToActionFont = styled(GameFont)`
  font-size: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 1.2rem;
  }
`;
