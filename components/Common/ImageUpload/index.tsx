import { useState, useEffect, useRef } from "react";
import {
  ImageUploadContainer,
  PreviewsContainer,
  ImageContainer,
  CloseContainer,
} from "./styled";
// import CloseIcon from "~/assets/img/close.svg";
import CloseIcon from "assets/img/Close";

const ImageUpload = ({
  buttonLabel,
  marginLeft,
  multi,
  max,
  previewImages,
  passImagesToParent,
}: Props) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const prevPreviews = useRef<string[]>([]);

  useEffect(() => {
    if (previews !== prevPreviews.current) {
      passImagesToParent(previews);
      prevPreviews.current = previews;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previews, passImagesToParent]);

  useEffect(() => {
    if (previewImages && previewImages?.length > 0) {
      setPreviews(previewImages);
    }
  }, [previewImages]);

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

  const handleDelete = (index: number) => {
    let mutatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(mutatedPreviews);
  };

  return (
    <ImageUploadContainer marginLeft={marginLeft}>
      <div className="wrapper">
        <input
          type="file"
          id="file"
          className="file"
          accept="image/*"
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
              <ImageContainer key={i}>
                <CloseContainer>
                  <CloseIcon
                    onClick={() => handleDelete(i)}
                    className="close-icon"
                  />
                </CloseContainer>
                <img src={p} alt="preview" />
              </ImageContainer>
            ))}
        </PreviewsContainer>
      </div>
    </ImageUploadContainer>
  );
};

type Props = {
  buttonLabel: string;
  marginLeft?: string;
  multi: boolean;
  max: number;
  previewImages?: string[];
  passImagesToParent: (i: string[]) => void;
};

export default ImageUpload;
