import styled from "styled-components";

export const ChallengesPageWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.darkGreen};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChallengesCardContainer = styled.div`
  position: relative;
  display: flex;
  width: 80vw;
  margin: 9rem auto 13rem;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
`;
