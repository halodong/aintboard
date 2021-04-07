import styled from "styled-components";

export const LinkSidebar = styled.li`
  margin-bottom: 1rem;

  button {
    font-family: ${(props) => props.theme.fonts.quicksandBold};
    font-size: 1.5rem;
    text-transform: uppercase;
    outline: none;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }

  a {
    display: block;
    text-transform: none;
    font-size: 1.2rem;
    margin-top: 0.8rem;
    margin-left: 1rem;
  }
`;
