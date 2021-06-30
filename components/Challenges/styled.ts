import styled from "styled-components";
import { baseTaglineStyles } from "~/components/Header/styled";

export const AchieveChallengeWrapper = styled.div`
  .confirm-btn {
    display: block;
    margin: 1rem auto 0;
  }
`;

export const HomepageSubHeading = styled(baseTaglineStyles)`
  font-size: 1rem;
  text-transform: none;
  font-family: ${(props) => props.theme.fonts.quicksandReg};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 0.5rem;
  }

  .challenge-name {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const PowerUpText = styled.span`
  font-family: ${(props) => props.theme.fonts.gameFont};
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: white;
  margin-left: 0.5rem;
`;
