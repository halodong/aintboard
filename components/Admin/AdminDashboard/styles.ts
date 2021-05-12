import styled from "styled-components";

export const AdminPageWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.dark};
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
`;

export const AdminCards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 50%;
  height: 60%;
  margin: 1rem;
`;

export const AdminCard = styled.div`
  color: ${(props) => props.theme.colors.white};
  background: ${(props) => props.theme.colors.darkGreen};
  padding: 2rem;
  border-radius: 1.875rem;
  width: 18.75rem;
  height: 12.5rem;
  margin: 2rem;

  h3 {
    font-weight: bold;
    text-transform: uppercase;
  }
`;
