import styled from "styled-components";

export const ChallengesCardWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  height: 15rem;
  width: 30rem;
  display: flex;
  border-radius: ${(props) => props.theme.border["10px"]};
`;

export const PowerUpIcon = styled.div`
  width: 80%;
  & img {
    height: 100%;
    width: 100%;
  }
`;

export const PowerUpAmount = styled.div``;

export const ChallengeName = styled.div``;
