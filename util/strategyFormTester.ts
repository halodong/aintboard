import { toast } from "react-toastify";

const strategyFormTester = ({
  imagesToBeUploaded,
  userData,
  strategyContent,
}: Props) => {
  if (userData === "") {
    toast.error("You should be logged in to create a strategy");
    return false;
  }

  if (imagesToBeUploaded.length < 1) {
    toast.error("Upload at least one image");
    return false;
  }

  if (strategyContent.length < 1) {
    toast.error("Please write your strategy");
    return false;
  }

  return true;
};

type Props = {
  imagesToBeUploaded: string[];
  userData: string | object;
  strategyContent: string;
};

export default strategyFormTester;
