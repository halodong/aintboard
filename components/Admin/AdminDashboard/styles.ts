import styled from "styled-components";

export const AdminPageWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.dark};
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
`;

export const AdminSidebar = styled.div`
  background: ${(props) => props.theme.colors.darkGreen};
  width: 21.25rem;
  min-height: 100vh;
`;

export const AdminHeader = styled.div`
  background: ${(props) => props.theme.colors.darkerGreen};
  height: 8.75rem;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;

  h2 {
    position: relative;
    top: 1rem;
    left: 35%;

    font-size: 1.5rem;
    line-height: 1.75rem;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.white};
  }
`;

export const LogoContainer = styled.div`
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 6rem;
  width: 8rem;
  height: 8rem;
  cursor: pointer;
`;

export const SidebarContent = styled.div`
  margin: 2rem;
  list-style: none;
`;

export const AdminCards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 50%;
  height: 60%;
  margin: 1rem;
`;

export const AdminCard = styled.div`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.darkGreen};
  padding: 2rem;
  border-radius: 1.875rem;
  width: 18.75rem;
  height: 12.5rem;
  margin: 2rem;

  h3 {
    font-weight: bold;
    text-transform: uppercase;
  }
`;
