import styled from "styled-components";

export const HeaderWrapper = styled.div<HeaderWrapperProps>`
  width: 100%;
  background-color: ${(props) => props.theme.colors.dark};
  min-height: ${(props) =>
    props.isSearchPage ||
    props.isChallengePage ||
    props.isBoardGamePage ||
    props.isReviewArticlePage ||
    props.isSettingsPage
      ? "30rem"
      : "35rem"};
  position: relative;
  ${(props) =>
    !props.homepage &&
    `display: flex;
  flex-direction: column;
  justify-content: space-between;`}

  ${(props) => props.isUserPage && `justify-content: flex-start;`}

  .trees-1,
  .trees-2,
  .tent,
  .playing-icon {
    position: absolute;
    width: ${(props) => (props.isBuyAvatarsPage ? "10rem" : "25rem")};
    z-index: ${(props) => props.theme.zIndex["10th"]};
  }

  ${(props) =>
    (props.isBuyAvatarsPage || props.isEditorPage || props.isErrorPage) &&
    `
      min-height: 18rem;
      .tent {
        top: 7rem;
      }
  `};

  ${(props) =>
    (props.isReviewsPage || props.isOnlineBattles || props.isChallengePage) &&
    `
      min-height: 18rem;
      height: 24.7rem;
      .tent {
        top: 11.1rem;
        width: 18rem;
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
      top: 16.4rem;
      width: 15rem;
    }

    .playing-icon {
      bottom: 5.8rem;
      left: 17rem;
      width: 10rem;
      z-index: ${(props) => props.theme.zIndex["9th"]};
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
  isErrorPage?: boolean;
  isBuyAvatarsPage?: boolean;
  isSearchPage?: boolean;
  isChallengePage?: boolean;
  isBoardGamePage?: boolean;
  isReviewsPage?: boolean;
  isOnlineBattles?: boolean;
  isReviewArticlePage?: boolean;
  isUserPage?: boolean;
  isSettingsPage?: boolean;
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

export const CenterTagline = styled(baseTaglineStyles)<CenterTaglineProps>`
  text-transform: ${(props) => (props.isUserPage ? "none" : "uppercase")};
`;

type CenterTaglineProps = {
  isUserPage?: boolean;
};

export const LookingForText = styled(baseTaglineStyles)`
  margin-top: 3rem;
`;

export const GameFont = styled.h1`
  font-family: ${(props) => props.theme.fonts.gameFont};
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 0;
`;

export const Rubik = styled.h1`
  font-family: ${(props) => props.theme.fonts.rubikBold};
  font-weight: 700;
  font-size: 3rem;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export const ChallengesTagline = styled(baseTaglineStyles)`
  margin: 0;
  text-transform: none;
`;

export const BattlesTagline = styled(baseTaglineStyles)`
  margin-top: 0;
  margin-bottom: 0;
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
