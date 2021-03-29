import styled from "styled-components";

export const DropDownContainer = styled.div<DropDownContainerProps>`
  width: ${(props) => (props.isName ? "20rem" : "12rem")};
  margin: 0 0.5rem;
`;

type DropDownContainerProps = {
  isName?: boolean;
};
