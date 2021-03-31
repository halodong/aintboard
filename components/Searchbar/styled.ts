import styled from "styled-components";

export const customSelectStyles = {
  container: (provided: object) => ({
    ...provided,
    width: "38rem",
    margin: "0 auto",
    fontFamily: "Quicksand-Regular",
  }),
};

export const SearchBarContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;

  .links {
    margin-top: ${(props) => props.theme.spacing.md};

    a {
      color: ${(props) => props.theme.colors.white};
      padding: 0 3rem;
    }
  }
`;
