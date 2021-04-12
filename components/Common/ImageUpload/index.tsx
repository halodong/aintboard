import { useState, useEffect } from "react";
import {
  ImageUploadContainer,
  PreviewsContainer,
  ImageContainer,
} from "./styled";

const ImageUpload = ({
  buttonLabel,
  multi,
  max,
  passImagesToParent,
}: Props) => {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    passImagesToParent(previews);
  }, [previews, passImagesToParent]);

  let counter = 1;
  let tempFiles: string[] = [];

  const getPreview = (files: any) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      tempFiles.push(reader.result as string);

      if (files.length === counter) {
        if (previews.length > 0) {
          // add to previews, this means to prevent resetting the previews
          let tFiles = previews.concat(tempFiles);
          setPreviews(tFiles);
          return;
        }

        //set previews at first time
        setPreviews(tempFiles);
        return;
      }
      counter++;
      getPreview(files);
    };
    // Read in the image file as a data URL.
    reader.readAsDataURL(files[counter - 1]);
  };

  const imageText = max > 1 ? "images" : "image";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e?.target?.files || [];
    let previewsCount = previews.length;

    if (files.length + previewsCount > max) {
      alert(`Cannot upload more than ${max} ${imageText}`);
      return;
    }

    getPreview(files);
  };

  return (
    <ImageUploadContainer>
      <div className="wrapper">
        <input
          type="file"
          id="file"
          className="file"
          multiple={multi}
          onChange={handleChange}
        />
        <label htmlFor="file">{buttonLabel}</label>
        <h6>
          Max of {max} {imageText}
        </h6>

        <PreviewsContainer>
          {previews.length > 0 &&
            previews.map((p, i) => (
              <ImageContainer>
                <img key={i} src={p} alt="preview" />
              </ImageContainer>
            ))}
        </PreviewsContainer>
      </div>
    </ImageUploadContainer>
  );
};

type Props = {
  buttonLabel: string;
  multi: boolean;
  max: number;
  passImagesToParent: (i: string[]) => void;
};

type Img = {
  imgSrc: string[] | ArrayBuffer[] | null;
};

export default ImageUpload;
