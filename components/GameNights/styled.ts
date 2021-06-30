import styled from "styled-components";
import { baseTaglineStyles } from "~/components/Header/styled";

export const HomepageSubHeading = styled(baseTaglineStyles)`
  font-size: 1rem;
  text-transform: none;
  font-family: ${(props) => props.theme.fonts.quicksandReg};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    padding: 0.5rem;
  }
`;

export const GameNightLink = styled.a`
  display: block;
  color: white;
  text-align: center;
  text-decoration: underline;
`;
