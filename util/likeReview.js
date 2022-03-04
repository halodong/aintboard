import axios from "axios";
import { mutate } from "swr";
import { toast } from "react-toastify";

const likeReview = async ({ userObj, review }) => {
  const userId = userObj?._id;

  if (userId === review?.userData?.[0]?._id) {
    toast.error("You can't like your own review");
    return;
  }

  const res = await axios.post("/api/review/like", {
    userId,
    reviewId: review?._id,
  });

  if (!res.data.success) {
    toast.error(res.data.message);
  }

  //revalidate cache
  mutate(`/api/review/like?reviewId=${review?._id}`);
};

export default likeReview;
