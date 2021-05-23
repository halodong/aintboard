import CloseIcon from "assets/img/Close";
import * as Styles from "./styled";

export const ImagePreviewContainer = ({ previews, handleDelete }: Props) => {
  return (
    <Styles.PreviewsContainer>
      {previews.length > 0 &&
        previews.map((p, i) => (
          <Styles.ImageContainer key={i}>
            <Styles.CloseContainer>
              <CloseIcon
                onClick={() => handleDelete(i)}
                className="close-icon"
              />
            </Styles.CloseContainer>
            <img src={p} alt="preview" />
          </Styles.ImageContainer>
        ))}
    </Styles.PreviewsContainer>
  );
};

type Props = {
  previews: string[];
  handleDelete: (i: number) => void;
};

export default ImagePreviewContainer;
