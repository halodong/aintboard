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

export const PreviewsContainer = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 8rem;
  height: 8rem;
  margin-right: 1rem;
  border: 2px solid white;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CloseContainer = styled.div`
  position: absolute;
  right: -0.8rem;
  top: -0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  width: 1.8rem;
  height: 1.8rem;
  background-color: ${(props) => props.theme.colors.dark};
  cursor: pointer;

  .close-icon {
    width: 0.8rem;
    height: 0.8rem;
    fill: white;
    cursor: pointer;
  }
`;
