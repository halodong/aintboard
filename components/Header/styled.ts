import styled from "styled-components";

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
  width: 100%;
  background-color: ${(props) => props.theme.colors.dark};
  min-height: ${(props) =>
    props.isEditorPage ? "15rem" : props.homepage ? "35rem" : "30rem"};
  position: relative;

  .trees-1,
  .trees-2,
  .tent {
    position: absolute;
    width: ${(props) => (props.isBuyAvatarsPage ? "10rem" : "25rem")};
    z-index: ${(props) => props.theme.zIndex["10th"]};
  }

  ${(props) =>
    props.isBuyAvatarsPage &&
    `
      min-height: 18rem;
      .tent {
        top: 7rem;
      }
    `};

  .tent {
    z-index: ${(props) => props.theme.zIndex["9th"]};
    bottom: -2px;
  }

  .homepage-bg-container {
    .trees-1 {
      left: 0;
      top: 5.8rem;
    }

    .trees-2 {
      right: 0;
      top: 6.3rem;
    }

    .tent {
      left: 15rem;
      top: 16.5rem;
      width: 15rem;
    }

    .ground {
      height: 2rem;
      background-color: ${(props) => props.theme.colors.dark};
      width: 100%;
      position: absolute;
      bottom: 0;
      top: 29rem;
      ${(props) =>
        props.homepage &&
        `
      
      `}
    }
  }
`;

type HeaderWrapperProps = {
  homepage?: boolean;
  isEditorPage?: boolean;
  isSearchPage?: boolean;
  isChallengePage?: boolean;
  isBoardGamePage?: boolean;
  isBuyAvatarsPage?: boolean;
};

const baseTaglineStyles = styled.h1`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.rubikBold};
  font-size: 1.75rem;
  text-transform: uppercase;
  position: relative;
  z-index: ${(props) => props.theme.zIndex["8th"]};
  text-align: center;
  margin-top: 4rem;
`;

export const Tagline = styled(baseTaglineStyles)<TaglineProps>`
  ${(props) =>
    !props.homepage &&
    `
    position: absolute;
    font-size: 1rem;
    top: 7rem;
    margin: 0;
    left: 3.4rem;
  `}
`;

type TaglineProps = {
  homepage?: boolean;
};

export const CenterTagline = styled(baseTaglineStyles)``;

export const LookingForText = styled(baseTaglineStyles)`
  margin-top: 3rem;
`;

export const GameFont = styled.h1`
  font-family: ${(props) => props.theme.fonts.gameFont};
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  margin-top: 2rem;
`;
export const ChallengesTagline = styled(baseTaglineStyles)`
  margin-top: 2rem;
  text-transform: none;
`;

export const BattlesTagline = styled(baseTaglineStyles)`
  margin-top: 2.5rem;
  text-transform: none;
`;

export const BoardGameName = styled(baseTaglineStyles)`
  text-transform: none;
`;

export const CenterButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;
