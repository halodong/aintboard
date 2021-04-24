import styled from "styled-components";

export const BuyAvatarsWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.darkGreen};
  padding: 2rem;
  color: white;
`;

export const CommonAvatars = styled.div`
  h4 {
    display: block;
  }

  .avatars {
    display: flex;

    div {
      margin: 0 1rem;
    }
  }
`;

export const SpecialAvatars = styled.div`
  display: flex;
  flex-direction: column;

  .avatars {
    .avatar-icon {
      margin: 0;
    }
  }
`;

export const SpecialAvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const UnlockText = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;
  padding: 0.5rem;
  border-radius: ${(props) => props.theme.border["10px"]};

  span {
    cursor: pointer;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.dark};
  }
`;

export const GameFont = styled.h1`
  font-family: ${(props) => props.theme.fonts.gameFont};
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  margin-left: 0.5rem;
`;
