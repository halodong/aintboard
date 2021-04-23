import styled from "styled-components";
import { REVIEW_TYPE } from "util/constants";

export const BgImgWrapper = styled.div`
  position: relative;
  height: 6.5rem;
  width: 100%;
  max-height: 6.5rem;
  overflow: hidden;
  transition: 500ms ease all;

  img {
    object-fit: cover;
  }
`;

export const ReviewContent = styled.div`
  position: relative;
  max-height: 5.5rem;
  overflow: hidden;
  padding: 0 1rem;
  transition: 500ms ease all;
  font-size: 0.7rem;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.rubikReg} !important;
`;

export const ReviewCardContainer = styled.div`
  width: 100%;
  max-width: 13.25rem;
  height: 20.6rem;
  background-color: ${(props) => props.theme.colors.lightYellow};
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

export const Bottom = styled.div<BottomProps>`
  display: flex;
  align-items: flex-end;
  justify-content: ${(props) =>
    props.compType === REVIEW_TYPE.REVIEW ? "space-between" : "flex-end"};
  margin-top: 1.5rem;
`;

type BottomProps = {
  compType?: string;
};

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
