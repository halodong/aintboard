import { toast } from "react-toastify";

const reviewFormTester = ({ imagesToBeUploaded, userData }: Props) => {
  if (userData === "") {
    toast.error("You should be logged in to create a review");
    return false;
  }

  if (imagesToBeUploaded.length < 1) {
    toast.error("Upload at least one image");
    return false;
  }

  return true;
};

type Props = {
  imagesToBeUploaded: string[];
  userData: string | object;
};

export default reviewFormTester;
