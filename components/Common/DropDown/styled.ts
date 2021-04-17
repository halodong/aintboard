import styled from "styled-components";

export const DropDownContainer = styled.div<DropDownContainerProps>`
  width: 20rem;
  margin: ${(props) =>
    props.marginLeft ? `0.5rem 0 0.5rem ${props.marginLeft}` : "0 0.5rem"};

  .select {
    font-family: ${(props) => props.theme.fonts.quicksandReg};
  }
`;

type DropDownContainerProps = {
  marginLeft?: string;
};
