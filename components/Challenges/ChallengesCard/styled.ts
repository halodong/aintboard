import styled from "styled-components";

export const ChallengesCardWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  height: 15rem;
  width: 30rem;
  display: flex;
  border-radius: ${(props) => props.theme.border["10px"]};
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    margin: 1rem auto 1rem;
  }
`;

export const PowerUpAmount = styled.div`
  font-family: ${(props) => props.theme.fonts.gameFont};
  font-size: ${(props) => props.theme.fontSizes.xs};
  position: absolute;
  left: 35%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.white};
  height: 4rem;
  width: 4rem;
  border-radius: 100%;
`;

export const ChallengeName = styled.div`
  font-family: ${(props) => props.theme.fonts.quicksandReg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  & p {
    padding: 0 2rem;
    text-align: center;
  }
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 12.5rem;
  max-width: 12.5rem;
  min-width: 12.5rem;
  overflow: hidden;

  img {
    object-fit: cover;
    border-top-left-radius: ${(props) => props.theme.border["10px"]};
    border-bottom-left-radius: ${(props) => props.theme.border["10px"]};
  }
`;

export const Achieved = styled.p`
  font-family: ${(props) => props.theme.fonts.rubikBold};
  color: ${(props) => props.theme.colors.darkGreen};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;
