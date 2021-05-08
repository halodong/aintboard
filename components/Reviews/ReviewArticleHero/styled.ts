import styled from "styled-components";

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
  width: 50%;
  margin-left: 1rem;
`;

export const OverallRating = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 2rem;
  }
`;

export const HeartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 2rem;
  }

  span {
    font-size: 1rem;
    margin-right: 0.5rem;
  }
`;
