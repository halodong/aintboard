import { useState, useRef, useEffect } from "react";
import { ImageUploadContainer } from "./styled";

const ImageUpload = ({ buttonLabel, multi, max }: Props) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {

  // }, [previews])

  const getPreview = (file: Blob, callback: (s: string) => void) => {
    for (let f of files) {
      // let reader = new FileReader();
      // reader.onloadend = () => {
      //     filesArray.push(reader.result as string);
      //     setPreviews(filesArray);
      //     // setPreviews([...previews, reader.result as string])
      // };
      // // Read in the image file as a data URL.
      // reader.readAsDataURL(f);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e?.target?.files || [];
    let filesArray: string[] = [];

    // for (let f of files) {
    //     // let reader = new FileReader();
    //     // reader.onloadend = () => {
    //     //     filesArray.push(reader.result as string);
    //     //     setPreviews(filesArray);
    //     //     // setPreviews([...previews, reader.result as string])
    //     // };
    //     // // Read in the image file as a data URL.
    //     // reader.readAsDataURL(f);
    //     getPreview(f, (s) => {

    //     });
    // }
  };

  return (
    <ImageUploadContainer>
      <input
        type="file"
        id="file"
        className="file"
        multiple={multi}
        max={max}
        onChange={handleChange}
        ref={fileInputRef}
      />
      <label htmlFor="file">{buttonLabel}</label>
      <h6>Max of 3 images</h6>
      {previews.length > 0 &&
        previews.map((p, i) => (
          <img
            key={i}
            src={p}
            alt="preview"
            style={{ objectFit: "cover", width: 200 }}
          />
        ))}
    </ImageUploadContainer>
  );
};

type Props = {
  buttonLabel: string;
  multi: boolean;
  max: number;
};

type Img = {
  imgSrc: string[] | ArrayBuffer[] | null;
};

export default ImageUpload;
