import styled from "styled-components";

export const AdminOnlineBattlesWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.dark};
`;

export const AdminOnlineBattlesContainer = styled.div`
  margin: 3rem;
  padding: 1rem 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colors.darkGreen};
  border-radius: ${(props) => props.theme.border["10px"]};
`;

export const AdminTitle = styled.h2`
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.rubikBold};
`;

export const OnlineBattleContainer = styled.div`
  display: flex;
  margin: 2rem 0;
`;

export const OnlineBattleImage = styled.div`
  height: 8rem;
  width: 16rem;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

export const OnlineBattleContent = styled.div`
  flex: 2;
  padding: 0.5rem 1rem;
`;

export const OnlineBattleTitle = styled.h3`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.rubikReg};
  max-width: 14rem;
  margin: 0;
`;

export const OnlieBattleCTA = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 1rem;
  grid-template-areas:
    ". ."
    ". delete";

  .delete {
    grid-area: delete;
  }
`;
