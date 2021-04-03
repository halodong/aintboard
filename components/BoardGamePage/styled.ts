import styled from "styled-components";

export const BoardGamaPageWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.dark};
`;

export const LeftSide = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.colors.darkGreen};
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const RightSide = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ReviewsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1<TitleProps>`
  font-family: ${(props) =>
    props.isGameFont
      ? props.theme.fonts.gameFont
      : props.theme.fonts.rubikBold};
  color: ${(props) => props.theme.colors.white};
`;

type TitleProps = {
  isGameFont?: boolean;
};

export const ReviewsCardWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  margin: 3rem 0;
`;

export const ChallengesSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

export const ChallengesCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  margin: 3rem 0;
`;

export const OnlineBattlesSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

export const OnlineBattleCardWrapper = styled.div`
  margin: 3rem 0;
`;
