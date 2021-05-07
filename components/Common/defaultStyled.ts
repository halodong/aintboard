import styled from "styled-components";

export const DefaultHeightWrapper = styled.div<DefaultHeightWrapperProps>`
  min-height: calc(100vh - 40rem);
  background-color: ${(props) => props.theme.colors.darkGreen};
  z-index: ${(props) =>
    props.zIndex ? props.theme.zIndex[props.zIndex] : "auto"};
  position: ${(props) => (props.position ? props.position : "static")};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "0")};
`;

type DefaultHeightWrapperProps = {
  zIndex?: string;
  position?: string;
  marginTop?: string;
};
