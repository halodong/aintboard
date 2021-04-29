import styled from "styled-components";

export const DefaultHeightWrapper = styled.div`
  min-height: calc(100vh - 40rem);
  background-color: ${(props) => props.theme.colors.darkGreen};
`;
