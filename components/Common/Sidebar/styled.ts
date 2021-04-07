import styled from "styled-components";

export const SidebarContainer = styled.div<SidebarContainerProps>`
  position: relative;
  background-color: ${(props) => props.theme.colors.darkGreen};
  width: 30rem;
  height: 100vh;
  padding: 3.5rem;
  position: fixed;
  top: 0;
  right: ${(props) => (props.menuOpen ? "0" : "-30rem")};
  z-index: ${(props) => props.theme.zIndex["4th"]};
  transition: 300ms all ease-in;
  color: white;
`;

type SidebarContainerProps = {
  menuOpen: boolean;
};

export const OverlaySidebar = styled.div<OverlayProps>`
  display: ${(props) => (props.menuOpen ? "block" : "none")};
  background-color: black;
  opacity: 0.7;
  z-index: ${(props) => props.theme.zIndex["5th"]};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

type OverlayProps = {
  menuOpen: boolean;
};

export const UserSidebar = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;

  h4 {
    margin-left: 1rem;
  }
`;

export const UlSidebar = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 3rem;
`;

export const PrimaryLinkSidebar = styled.li`
  font-family: ${(props) => props.theme.fonts.quicksandBold};
  font-size: 1.5rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

export const SecondaryLinkSidebar = styled.li<SecondaryLinkSidebarProps>`
  font-family: ${(props) => props.theme.fonts.quicksandReg};
  font-size: 1.3rem;
  text-transform: none;
  margin-bottom: 1rem;
  margin-top: ${(props) => (props.margintop ? props.margintop : 0)};
`;

type SecondaryLinkSidebarProps = {
  margintop?: string;
};

export const LogoutButton = styled.button<LogoutButtonProps>`
  font-family: ${(props) => props.theme.fonts.quicksandReg};
  font-size: 1.3rem;
  text-transform: none;
  margin-bottom: 1rem;
  margin-top: ${(props) => (props.margintop ? props.margintop : 0)};
  border: none;
  border-radius: 5rem;
  padding: 0.8rem;
  cursor: pointer;
  outline: none;
`;

type LogoutButtonProps = {
  margintop?: string;
};

export const TertiaryLinkSidebar = styled.li`
  font-family: ${(props) => props.theme.fonts.quicksandLight};
  font-size: 1rem;
  text-transform: none;
  margin-bottom: 1rem;
`;

export const Copyright = styled.li`
  font-family: ${(props) => props.theme.fonts.quicksandLight};
  color: ${(props) => props.theme.colors.paleGray};
  font-size: 0.8rem;
  text-transform: none;
  margin: 2rem 0;
`;

export const FooterSidebar = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  min-height: 15rem;
  padding: 0 3.5rem;
  background-color: ${(props) => props.theme.colors.darkerGreen};
`;
