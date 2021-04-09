import styled from "styled-components";

export const ImageUploadContainer = styled.div`
  .wrapper {
    margin: 0 auto;
    width: 30rem;
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
    margin-bottom: 1rem;
  }

  h6 {
    display: inline-block;
    margin-left: 1rem;
    font-size: 0.8rem;
  }
`;

export const PreviewsContainer = styled.div`
  margin-bottom: 1rem;
`;

export const ImageContainer = styled.div`
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
