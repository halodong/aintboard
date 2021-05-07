import styled from "styled-components";

export const ReviewArticlePageWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.darkGreen};
  color: ${(props) => props.theme.colors.white};
  padding: 0 10rem 10rem 10rem;
`;

export const ReviewHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem 2rem 0;
`;

export const ReviewHeaderLeft = styled.div`
  display: inline-block;
`;

export const SliderWrapper = styled.div`
  display: inline-block;
  width: 100%;
  margin-left: 1rem;
`;

export const OverallRating = styled.span`
  display: flex;
  align-items: center;

  span {
    font-size: 2rem;
  }
`;

export const LanguageContainer = styled.div`
  padding: 3rem 0;
`;

export const ReviewContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const RatingWrapper = styled.div`
  padding: 3rem 0;
  margin: 0 7rem;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

export const RatingName = styled.div`
  width: 10rem;
`;

export const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

export const ArticleName = styled.h1`
  font-size: 3rem;
  margin: 1rem;
  padding: 0 20rem;
`;

export const ArticleAuthor = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem;
`;

export const ArticleDate = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem;
`;

export const TipText = styled.div`
  margin-bottom: 1rem;
`;
