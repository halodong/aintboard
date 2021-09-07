import styled from "styled-components";
import { theme } from "~/styles/theme";

export const BattleCardWrapper = styled.div`
  background: ${theme.colors.darkGreen};
  display: flex;
  justify-content: center;
  min-height: 60vh;
`;

export const BattleCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;
