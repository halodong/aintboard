import styled from "styled-components";

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
`;

export const BgImgWrapper = styled.div`
  height: 6.5rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserWrapper = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.white};
  margin: -1.5rem auto 0;
  overflow: hidden;

  .icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
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

export const ReviewContent = styled.div`
  position: relative;
  max-height: 5.5rem;
  overflow: hidden;
  padding: 0 1rem;

  p {
    font-size: 0.7rem;
    text-align: center;
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;

  .dice {
    margin-left: 0.5rem;
  }
`;

export const BottomRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;

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
