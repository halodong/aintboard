import styled from "styled-components";

export const AdminSidebar = styled.div`
  background: ${(props) => props.theme.colors.darkGreen};
  min-width: 21.25rem;
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
