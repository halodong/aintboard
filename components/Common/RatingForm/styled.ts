import styled from "styled-components";

export const RatingFormWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;

  .dice {
    width: 3rem;
    height: 3rem;
    margin-right: 1rem;
    cursor: pointer;
  }
`;

export const RatingLabel = styled.label`
  color: white;
  text-align: right;
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
