import styled from "styled-components";

export const NewReviewWrapper = styled.div`
  min-height: calc(100vh - 40rem);
  background-color: ${(props) => props.theme.colors.darkGreen};
  padding: 5rem;
`;

export const YoutubeContainer = styled.div`
  position: relative;
  background-color: white;
  width: 40rem;
  height: 20rem;
  margin-bottom: 10rem;

  .label {
    color: black;
    position: absolute;
    width: 100%;
    text-align: center;
    top: 5rem;
  }
`;

export const Title = styled.h1`
  color: white;
  font-size: 1.5rem;
  font-family: ${(props) => props.theme.fonts.quicksandBold};
  margin-top: 0;
  margin-bottom: 2rem;
`;
