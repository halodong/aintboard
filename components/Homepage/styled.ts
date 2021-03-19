import styled from "styled-components";

export const HeaderWrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.dark};
  min-height: 19.5rem;
  overflow: hidden;
`;

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
