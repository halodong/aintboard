import styled from "styled-components";

export const ChallengesPageWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.darkGreen};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChallengesCardContainer = styled.div`
  display: grid;
  place-items: center;
  gap: 2rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 5rem 0;
`;
