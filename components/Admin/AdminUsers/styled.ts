import styled from "styled-components";

export const AdminUsersWrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.dark};
`;

export const AdminUsersContainer = styled.div`
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

export const UserContainer = styled.div`
  display: flex;
  margin: 2rem 0;
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Username = styled.h3`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.rubikReg};
  margin: 0;
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

export const UserCTA = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 1rem;
`;
