import styled from "styled-components";

export const OnlineBattleCardWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  height: 25rem;
  width: 40rem;
  display: flex;
  border-radius: ${(props) => props.theme.border["10px"]};

  .play {
    position: absolute;
    left: 35%;
    margin-top: 1rem;
  }
`;

export const BattleImage = styled.div`
  position: relative;
  width: 40%;

  img {
    border-top-left-radius: ${(props) => props.theme.border["10px"]};
    border-bottom-left-radius: ${(props) => props.theme.border["10px"]};
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const BattleCard = styled.div`
  width: 60%;
  padding: 0 3rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const BattleName = styled.h2`
  font-family: ${(props) => props.theme.fonts.quicksandBold};
  margin: 0;
`;

export const BattleDate = styled.h2`
  font-family: ${(props) => props.theme.fonts.quicksandBold};

  margin: 0;
`;

export const BattleEnds = styled.p`
  font-family: ${(props) => props.theme.fonts.quicksandBold};

  color: ${(props) => props.theme.colors.mediumRed};
`;

export const Rank = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
`;

export const Place = styled.div`
  font-family: ${(props) => props.theme.fonts.quicksandBold};

  padding: 1rem;
  border-radius: ${(props) => props.theme.border["10px"]};
  background-color: ${(props) => props.theme.colors.darkGreen};
  color: ${(props) => props.theme.colors.white};
`;

export const Username = styled.div`
  font-family: ${(props) => props.theme.fonts.quicksandBold};

  padding: 1rem;
`;
