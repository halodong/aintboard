import styled from "styled-components";
export const DropDownWrapper = styled.div<DropDownWrapperProps>`
  position: relative;
  width: ${(props) => (props.isName ? "20rem" : "12rem")};
  margin: 0 0.5rem;
`;

type DropDownWrapperProps = {
  isName?: boolean;
};

export const DropDownMenu = styled.button`
  background-color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 100%;
  outline: none;
  border: none;
  border-radius: ${(props) => props.theme.border["10px"]};
  margin-bottom: 0.5rem;
`;

export const Select = styled.span`
  font-size: ${(props) => props.theme.fontSizes.md};
`;

export const OptionContainer = styled.div`
  z-index: 1;
  background-color: ${(props) => props.theme.colors.white};
  padding: 1rem;
  width: 100%;
  border-radius: ${(props) => props.theme.border["10px"]};
  position: absolute;
`;

export const Option = styled.div`
  cursor: pointer;
  padding: 0.5rem;

  &::hover {
    background-color: ${(props) => props.theme.colors.lightGray};
  }
`;
