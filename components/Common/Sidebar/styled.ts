import styled from "styled-components";

export const SidebarContainer = styled.div<SidebarContainerProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.darkGreen};
  width: 30rem;
  height: 100vh;
  top: 0;
  right: ${(props) => (props.menuOpen ? "0" : "calc(-100vw)")};
  z-index: ${(props) => props.theme.zIndex["4th"]};
  transition: 300ms all ease-in;
  color: white;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
  }

  /* @media (max-width: ${(props) => props.theme.breakpoints.sm2}) {
    width: 30rem;
    right: ${(props) => (props.menuOpen ? "0" : "calc(-100vw)")};
  } */
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
  padding: 3.5rem 0 0 3.5rem;

  a {
    display: flex;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  h4 {
    margin-left: 1rem;
  }
`;

export const UlSidebar = styled.ul`
  list-style: none;
  padding: 0 0 1rem 3.5rem;
  margin: 0;

  .icon {
    width: 3rem;
    margin-left: 0.5rem;
  }
`;

export const PowerUps = styled.span`
  font-family: ${(props) => props.theme.fonts.gameFont};
  color: white;
  margin-left: 0.5rem;
`;

export const PrimaryLinkSidebar = styled.li`
  font-family: ${(props) => props.theme.fonts.quicksandBold};
  font-size: 1.5rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

export const SecondaryLinkSidebar = styled.li<SecondaryLinkSidebarProps>`
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.quicksandReg};
  font-size: 1.3rem;
  text-transform: none;
  margin-bottom: 1rem;
  margin-top: ${(props) => (props.margintop ? props.margintop : 0)};
`;

type SecondaryLinkSidebarProps = {
  margintop?: string;
};

export const LogoutButton = styled.button`
  font-family: ${(props) => props.theme.fonts.quicksandReg};
  font-size: 1.3rem;
  text-transform: none;
  margin-bottom: 1rem;
  margin-top: 3rem;
  border: none;
  border-radius: 5rem;
  padding: 0.8rem;
  cursor: pointer;
  outline: none;
`;

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
  margin-top: 2rem;
`;

export const FooterSidebar = styled.div`
  width: 100%;
  padding: 2rem 3.5rem;
  background-color: ${(props) => props.theme.colors.darkerGreen};

  ul {
    margin: 0;
    padding: 0;
  }
`;
