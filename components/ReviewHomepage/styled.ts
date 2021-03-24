import styled from "styled-components";

export const ReviewContainer = styled.div`
  width: 100%;
  min-height: 67rem;
  background-color: ${(props) => props.theme.colors.dark};
  z-index: 10;
  position: relative;
  overflow: hidden;

  .maze {
    position: absolute;
    width: 63rem;
    margin: 0 auto;
    text-align: center;
    left: 0;
    right: 0;
  }

  .water-left {
    position: absolute;
    left: 0;
    top: 18rem;
  }

  .water-right {
    position: absolute;
    right: 0;
    top: 11rem;
  }
`;

export const ReviewCardWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  width: 57%;
  margin: 9rem auto 13rem;
  flex-wrap: wrap;
  justify-content: space-around;
`;
