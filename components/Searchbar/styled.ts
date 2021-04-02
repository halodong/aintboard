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
    width: 40rem;
    margin-top: ${(props) => props.theme.spacing.md};
    display: flex;
    justify-content: space-between;

    a {
      padding: 0.625rem ${(props) => props.theme.spacing.md};
      color: ${(props) => props.theme.colors.white};
      background-color: ${(props) => props.theme.colors.dark};
      border: 2px solid white;
      border-radius: ${(props) => props.theme.border["10px"]};
    }
  }
`;
