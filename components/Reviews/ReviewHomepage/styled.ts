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
  max-width: 52rem;
  margin: 9rem auto 13rem;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;

  .mainButtonContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 26%;
    height: 20.6rem;

    button {
      position: relative;
      max-width: 13.25rem;
      height: 9rem;
      background-color: ${(props) => props.theme.colors.lightYellow};
      border-radius: 10px;
      border: 2px solid ${(props) => props.theme.colors.black};
      font-family: ${(props) => props.theme.fonts.rubikReg};
      font-size: 1rem;
      cursor: pointer;
      outline: none;
    }
  }
`;
