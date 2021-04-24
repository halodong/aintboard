import styled, { css } from "styled-components";

export const NavbarContainer = styled.nav<NavbarContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.colors.dark};
  height: 8rem;
  padding: 0 ${(props) => props.theme.spacing.lg};
  position: ${(props) => (props.isFixed ? "fixed" : "static")};
  width: 100%;
  z-index: ${(props) => props.theme.zIndex["6th"]};

  top: ${(props) => (props.isFixed ? "0" : "-9rem")};
  transition: all 0.5s ease-out;

  .logo {
    width: 14.25rem;
    flex: 1;
    margin-left: 2rem;
  }

  svg {
    width: 9rem;
  }
`;

export const LogoContainer = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  left: 2.5rem;
`;

export const NavbarWrapper = styled.div`
  height: 8rem;
`;

type NavbarContainerProps = {
  isFixed?: boolean;
};

export const NavBarButtons = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  button {
    margin: 0 0.5rem;
    width: 5rem;
    min-width: 5rem;
    font-size: 1rem;
  }
`;

export const RightSideNav = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

export const MenuIcon = styled.div<MenuIconProps>`
  width: 2rem;
  height: 2rem;
  position: relative;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
  z-index: ${(props) => props.theme.zIndex["3rd"]};

  span {
    display: block;
    position: absolute;
    height: 0.1875rem; //3px
    width: 100%;
    background: white;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: 0px;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: 0.8rem;
    }

    &:nth-child(4) {
      top: 1.6rem;
    }

    ${(props) =>
      props.openMenu &&
      css`
        &:nth-child(1) {
          top: 18px;
          width: 0%;
          left: 50%;
        }

        &:nth-child(2) {
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
        }

        &:nth-child(3) {
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }

        &:nth-child(4) {
          top: 18px;
          width: 0%;
          left: 50%;
        }
      `}
  }
`;

type MenuIconProps = {
  openMenu: boolean;
};

export const Links = styled.div`
  position: absolute;
  max-width: 40rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;

  a {
    padding: 0.625rem ${(props) => props.theme.spacing.md};
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.dark};
    border: 2px solid white;
    border-radius: ${(props) => props.theme.border["10px"]};
  }
`;
