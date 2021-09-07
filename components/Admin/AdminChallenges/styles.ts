import styled from "styled-components";

export const AdminChallengesWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.dark};
`;

export const AdminChallengesContainer = styled.div`
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

export const ChallengeContainer = styled.div`
  display: flex;
  margin: 2rem 0;
`;

export const ChallengeImage = styled.div`
  height: 8rem;
  width: 16rem;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

export const ChallengeContent = styled.div`
  flex: 2;
  padding: 0.5rem 1rem;
`;

export const ChallengeTitle = styled.h3`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.rubikReg};
  max-width: 14rem;
  margin: 0;
`;

export const ChallengeCTA = styled.div`
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 1rem;
`;
