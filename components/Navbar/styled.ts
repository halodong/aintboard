import styled from "styled-components";

export const NavbarContainer = styled.nav<NavbarContainerprops>`
  background-color: ${(props) => props.theme.colors.dark};
  height: 8rem;
  display: flex;
  align-items: center;
  padding: 0 ${(props) => props.theme.spacing.lg};
  position: ${(props) => (props.isFixed ? "fixed" : "static")};
  width: 100%;
  z-index: 9999;

  top: ${(props) => (props.isFixed ? "0" : "-9rem")};
  transition: all 0.5s ease-out;

  .logo {
    flex: 1;
  }
`;
export const NavbarWrapper = styled.div`
  height: 8rem;
`;

type NavbarContainerprops = {
  isFixed?: boolean;
};

export const NavBarButtons = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  button {
    margin: 0 0.5rem;
  }
`;
