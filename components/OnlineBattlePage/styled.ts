import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

export const HeaderBattleName = styled.h1`
  font-size: 3rem;
  margin: 1rem;
  padding: 0 20rem;
`;

const basePTagStyles = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem;
`;

export const HeaderBoardGameName = styled(basePTagStyles)`
  color: ${(props) => props.theme.colors.lightGreen};
`;

export const HeaderAuthor = styled(basePTagStyles)``;

export const OnlineBattlePageWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.darkGreen};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EntryContainer = styled.div`
  display: flex;
  gap: 3rem;
  padding: 2rem;
  margin-top: 3rem;
`;

export const EntryImg = styled.div`
  position: relative;
  width: 50rem;

  img {
    object-fit: cover;
  }
`;

export const EntryRightSide = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RanksContainer = styled.div`
  margin: 2rem 0;
`;

export const Username = styled.div`
  font-family: ${(props) => props.theme.fonts.quicksandBold};
  color: ${(props) => props.theme.colors.white};
`;

export const Ranks = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin: 0.5rem 0;
  gap: 1rem;
`;

export const Place = styled.div`
  width: 2rem;
`;

export const EntryDate = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.rubikBold};
`;

export const EntryDetails = styled.div`
  font-family: ${(props) => props.theme.fonts.rubikReg};
  color: ${(props) => props.theme.colors.white};
  padding: 2rem 3.5rem;
  margin-bottom: 3rem;
  width: 70rem;
  p {
    margin: 0;
  }
`;
