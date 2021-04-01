import styled from "styled-components";

export const UserWrapper = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.white};
  margin: -1.5rem auto 0;
  overflow: hidden;
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

export const AvatarWrapper = styled.div`
  display: flex;
  margin: 2rem;
`;
