import styled from "styled-components";

export const RatingFormWrapper = styled.div<RatingFormWrapperProps>`
  display: flex;
  align-items: center;
  padding: ${(props) =>
    props.paddingBottom ? `1rem 0 ${props.paddingBottom}` : "1rem 0"};

  .dice {
    width: ${(props) => (props.big ? "4rem" : "3rem")};
    height: ${(props) => (props.big ? "4rem" : "3rem")};
    margin-right: 1rem;
    cursor: pointer;
  }
`;

type RatingFormWrapperProps = {
  paddingBottom?: string;
  big?: boolean;
};

export const RatingLabel = styled.label`
  color: white;
  font-family: ${(props) => props.theme.fonts.quicksandReg};
  font-size: 0.9rem;
  text-align: left;
  margin-right: 1rem;
  min-width: 10rem;
`;

export const DiceContainer = styled.div<DiceContainerProps>`
  svg {
    path {
      fill: ${(props) => !props.hovered && "gray !important"};
      stroke: ${(props) => !props.hovered && "gray !important"};
    }

    ellipse {
      fill: ${(props) => !props.hovered && "gray !important"};
      stroke: ${(props) => !props.hovered && "gray !important"};
    }

    circle {
      fill: ${(props) => !props.hovered && "gray !important"};
      stroke: ${(props) => !props.hovered && "gray !important"};
    }
  }
`;

type DiceContainerProps = {
  hovered: boolean;
};

export const FloatRating = styled.label`
  color: white;
  font-size: 1.5rem;
`;
