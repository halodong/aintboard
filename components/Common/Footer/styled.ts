import styled from "styled-components";

export const FooterWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 25rem;
  background-color: ${(props) => props.theme.colors.dark};

  .left {
    position: absolute;
    left: 0;
    bottom: 3.6rem;
    z-index: ${(props) => props.theme.zIndex["9th"]};
  }

  .right {
    position: absolute;
    right: 0;
    bottom: 3.4rem;
    z-index: ${(props) => props.theme.zIndex["9th"]};
  }

  .bottom {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: ${(props) => props.theme.zIndex["10th"]};
  }

  .logo-copy {
    margin-right: 2rem;

    h6 {
      color: white;
      font-family: ${(props) => props.theme.fonts.quicksandReg};
      text-align: right;
      margin-top: 0.5rem;
    }

    svg {
      margin-top: 2rem;
      width: 6rem;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    height: 20rem;
    flex-direction: column;

    .left,
    .right,
    .bottom {
      display: none;
    }

    .logo-copy {
      margin-right: 0rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      svg {
        margin-top: 0rem;
      }
    }
  }
`;

export const LinksWrapper = styled.div`
  color: white;
  width: 10rem;
  margin-top: 1rem;

  ul {
    list-style: none;
    font-family: ${(props) => props.theme.fonts.quicksandReg};

    li {
      margin-top: 0.5rem;
    }
  }
`;

export const LogoContainer = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
`;
