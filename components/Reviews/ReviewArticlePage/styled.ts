import styled from "styled-components";

export const ReviewArticlePageWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.darkGreen};
  color: ${(props) => props.theme.colors.white};
  padding: 0 10rem;
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
`;

export const ArticleName = styled.h1`
  margin: 1rem;
  padding: 0 8rem;
`;

export const ArticleAuthor = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem;
`;

export const ArticleDate = styled.p`
  font-size: 1.5rem;
  margin: 0.5rem;
`;
