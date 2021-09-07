import styled from "styled-components";

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  padding-bottom: 1rem;
  z-index: ${(props) => props.theme.zIndex["7th"]};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    margin-top: 0;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const Text = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.white};
  margin-right: 0.5rem;
  z-index: 1;
`;
