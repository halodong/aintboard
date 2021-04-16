import styled from "styled-components";

export const NewReviewWrapper = styled.div`
  min-height: calc(100vh - 40rem);
  background-color: ${(props) => props.theme.colors.darkGreen};
  padding: 5rem;
  color: white;
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
