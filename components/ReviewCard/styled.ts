import styled from "styled-components";

export const BgImgWrapper = styled.div`
  height: 6.5rem;
  overflow: hidden;
  transition: 500ms ease all;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ReviewContent = styled.div`
  position: relative;
  max-height: 5.5rem;
  overflow: hidden;
  padding: 0 1rem;
  transition: 500ms ease all;

  p {
    font-size: 0.7rem;
    text-align: center;
  }
`;

export const ReviewCardContainer = styled.div`
  width: 26%;
  max-width: 13.25rem;
  height: 20.6rem;
  background-color: ${(props) => props.theme.colors.lightYellow};
  margin-bottom: 2rem;
  border: 2px solid ${(props) => props.theme.colors.black};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:hover {
    ${BgImgWrapper} {
      height: 3rem;
    }

    ${ReviewContent} {
      max-height: 10rem;
    }
  }
`;

export const Username = styled.h5`
  color: ${(props) => props.theme.colors.black};
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 0;
`;

export const ReviewDate = styled.div`
  text-align: center;
  font-size: 0.6rem;
  margin: 0;
`;

export const BottomWrapper = styled.div`
  position: absolute;
  bottom: 0.5rem;
  width: 100%;
  padding: 0 1rem;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

export const BottomRight = styled.div`
  display: flex;
  flex-direction: column;

  h6 {
    margin: 0;
    text-align: right;
  }

  .socials {
    svg {
      width: 1rem;
    }

    span {
      font-size: 0.6rem;
    }
  }
`;
