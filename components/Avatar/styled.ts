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

  .icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  svg,
  path {
    width: 5rem;
    height: 5rem;
  }
`;
