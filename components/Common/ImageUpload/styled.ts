import styled from "styled-components";

export const ImageUploadContainer = styled.div`
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
