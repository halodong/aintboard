import styled from "styled-components";
import {
  REVIEWS_HOMEPAGE_COMPONENT,
  SIDEBAR_COMPONENT,
  CHOOSE_AVATAR_COMPONENT,
} from "~/util/constants";

export const UserWrapper = styled.div<UserWrapperProps>`
  position: relative;
  width: ${(props) =>
    props.from === CHOOSE_AVATAR_COMPONENT ? "4rem" : "3rem"};
  height: ${(props) =>
    props.from === CHOOSE_AVATAR_COMPONENT ? "4rem" : "3rem"};
  border-radius: 50%;
  border: ${(props) =>
    props.isChosen
      ? `5px solid ${props.theme.colors.white}`
      : `1px solid ${props.theme.colors.black}`};
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.colors.white};
  margin: ${(props) =>
    props.from === REVIEWS_HOMEPAGE_COMPONENT
      ? "-1.5rem auto 0"
      : props.from === SIDEBAR_COMPONENT
      ? 0
      : "0 auto"};
  overflow: hidden;
  transition: 300ms ease all;
  cursor: pointer;

  .icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &.special-icon {
    position: relative;
    cursor: auto;

    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.4);
    }
  }

  svg,
  path {
    width: 5rem;
    height: 5rem;
  }
`;

type UserWrapperProps = {
  isChosen?: boolean;
  from?: string;
  bgColor?: string;
};

export const AvatarWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;
