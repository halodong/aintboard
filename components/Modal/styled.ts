import styled from "styled-components";

export const ModalHeader = styled.div`
  height: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.darkerGreen};
  font-family: ${(props) => props.theme.fonts.rubikBold};
  text-transform: uppercase;
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .close-icon {
    width: 1rem;
    height: 1rem;
    fill: white;
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
  background-color: ${(props) => props.theme.colors.darkGreen};
  padding: ${(props) => props.theme.spacing.md2};
  color: white;
`;
