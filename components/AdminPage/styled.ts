import styled from "styled-components";

export const AdminPageWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.dark};
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LogoContainer = styled.div`
  padding: 4rem;
  position: absolute;
  top: 0;
  left: 0;
`;

export const AdminPageText = styled.h1`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.rubikBold};
  text-transform: uppercase;
`;

export const AdminLoginContainer = styled.div`
  form {
    padding: 2rem;
    background-color: ${(props) => props.theme.colors.darkGreen};
    border-radius: 0 0 10px 10px;
  }

  h6 {
    color: ${(props) => props.theme.colors.white};
  }
`;

export const AdminLoginHeader = styled.h3`
  color: ${(props) => props.theme.colors.white};
  text-transform: uppercase;
  background-color: ${(props) => props.theme.colors.darkerGreen};
  padding: 1rem;
  margin: 0;
  border-radius: 10px 10px 0 0;
`;
