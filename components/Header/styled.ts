import styled from "styled-components";

export const HeaderWrapper = styled.div<HeaderWrappepProps>`
  width: 100%;
  background-color: ${(props) => props.theme.colors.dark};
  min-height: ${(props) => (props.isSearchPage ? "23rem" : "29rem")};
  overflow: hidden;
  position: relative;

  .trees-1,
  .trees-2,
  .tent {
    position: absolute;
    width: 25rem;
    z-index: 0;
  }

  .tent {
    z-index: 1;
  }

  .homepage-bg-container {
    .trees-1 {
      left: 0;
      top: 6rem;
    }

    .trees-2 {
      right: 0;
      top: 6.5rem;
    }

    .tent {
      left: 15rem;
      top: 16.5rem;
      width: 15rem;
    }
  }
`;

type HeaderWrappepProps = {
  isSearchPage?: boolean;
};

export const NavBarContent = styled.div`
  margin: ${(props) => props.theme.spacing["50px"]};
  display: flex;
  justify-content: space-between;
`;

export const NavBarButtons = styled.div`
  width: 21.5rem;
  display: flex;
  justify-content: space-between;
`;

export const SearchContainer = styled.div`
  width: 100%;
  text-align: center;
  z-index: 10;
  position: relative;

  .links {
    margin-top: ${(props) => props.theme.spacing.md};

    a {
      color: ${(props) => props.theme.colors.white};
      padding: 0 3rem;
    }
  }
`;

const baseTaglineStyles = styled.h1`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.rubikBold};
  font-size: 1.75rem;
  text-transform: uppercase;
  position: relative;
  z-index: 20;
  text-align: center;
  margin-top: 4rem;
`;

export const Tagline = styled(baseTaglineStyles)<TaglineProps>`
  ${(props) =>
    !props.homepage &&
    `
    position: absolute;
    font-size: 1rem;
    top: 6rem;
    margin: 0;
    left: 3.4rem;
  `}
`;

type TaglineProps = {
  homepage?: boolean;
};

export const LookingForText = styled(baseTaglineStyles)`
  margin-top: 3rem;
`;
