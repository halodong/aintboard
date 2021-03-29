import styled from "styled-components";

export const ChallengesCardWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  height: 15rem;
  width: 30rem;
  display: flex;
  border-radius: ${(props) => props.theme.border["10px"]};
`;

export const PowerUpIcon = styled.div`
  width: 70%;
  img {
    border-top-left-radius: ${(props) => props.theme.border["10px"]};
    border-bottom-left-radius: ${(props) => props.theme.border["10px"]};
    height: 100%;
    width: 100%;
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
  & p {
    padding: 0 2rem;
    text-align: center;
  }
`;
