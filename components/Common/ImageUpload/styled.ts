import styled from "styled-components";

export const ImageUploadContainer = styled.div<ImageUploadContainerProps>`
  .wrapper {
    margin: ${(props) =>
      props.marginLeft ? `0 0 0 ${props.marginLeft}` : "0 auto"};
    width: 30rem;
    margin-bottom: 1rem;
  }

  .file {
    /* for accessibility */
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
  }

  label {
    position: relative;
    display: inline-block;
    padding: 1rem;
    border-radius: ${(props) => props.theme.border["10px"]};
    background: white;
    color: black;
    cursor: pointer;
  }

  h6 {
    display: inline-block;
    color: white;
    margin: 0 0 0 1rem;
    font-size: 0.8rem;
  }
`;

type ImageUploadContainerProps = {
  marginLeft?: string;
};
