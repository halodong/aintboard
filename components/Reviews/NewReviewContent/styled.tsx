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

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100% !important;

    div {
      width: 100% !important;
    }
  }
`;

export const Title = styled.h1<TitleProps>`
  display: inline-block;
  color: white;
  font-size: 1.5rem;
  font-family: ${(props) => props.theme.fonts.quicksandBold};
  margin: 0 1rem 2rem 0;
  background-color: ${(props) =>
    props.isChosen ? props.theme.colors.dark : "transparent"};
  padding: 1rem;
  border-radius: ${(props) => props.theme.border["10px"]};
  cursor: pointer;
`;

type TitleProps = {
  isChosen: boolean;
};
