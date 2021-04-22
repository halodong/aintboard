import styled from "styled-components";

export const NewReviewWrapper = styled.div`
  min-height: calc(100vh - 40rem);
  background-color: ${(props) => props.theme.colors.darkGreen};
`;

export const NewReviewTemplateWrapper = styled.div`
  padding: 5rem;
`;

export const YoutubeContainer = styled.div`
  position: relative;

  .label {
    color: black;
    position: absolute;
    width: 100%;
    text-align: center;
    top: 5rem;
  }
`;

export const Title = styled.h1`
  display: inline-block;
  color: white;
  font-size: 1.5rem;
  font-family: ${(props) => props.theme.fonts.quicksandBold};
  margin: 0 1rem 2rem 0;
`;
