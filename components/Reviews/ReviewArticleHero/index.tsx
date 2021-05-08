import axios from "axios";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";

import Button from "~/components/Common/Button";
import OverallRating from "~/components/Common/OverallRating";

import fetcher from "util/fetch";
import useCurrentUser from "hooks/useCurrentUser";
import Heart from "assets/img/Heart";
import {
  ReviewData,
  ReviewLikesApiResponse,
  UserApiResponse,
} from "~/types/types";

import * as Styles from "./styled";

const ReviewArticleHero = ({ review }: Props) => {
  const { data: reviewLikesApiData } = useSWR<ReviewLikesApiResponse>(
    review?._id ? `/api/review/like?reviewId=${review?._id}` : null,
    fetcher
  );

  const user = useCurrentUser();
  const userData = user?.userData ? JSON.parse(user?.userData) : {};

  const { data: userApiData } = useSWR<UserApiResponse>(
    userData?._id ? `/api/user/filter/_id/${userData?._id}` : null,
    fetcher
  );

  const userObj = userApiData?.response?.data?.users?.[0];

  const likeReview = async () => {
    const userId = userObj?._id;

    if (userId === review?.userData?.[0]?._id) {
      toast.error("You can't like your own review");
      return;
    }

    mutate(
      `/api/review/like?reviewId=${review?._id}`,
      () => {
        return {
          success: true,
          response: {
            message: "",
            totalLikes: reviewLikesApiData?.response?.totalLikes
              ? reviewLikesApiData?.response?.totalLikes + 1
              : 0,
          },
        };
      },
      false // dont revalidate cache yet
    );

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

  return (
    <Styles.ReviewHeader>
      <Styles.ReviewHeaderLeft>
        <Button bg="white">{review.language}</Button>
        <Styles.OverallRating>
          <OverallRating rating={review.overallRating} big />
          <span>{review.overallRating}</span>
        </Styles.OverallRating>
        <Styles.HeartWrapper onClick={likeReview}>
          <span>{reviewLikesApiData?.response?.totalLikes || 0}</span>
          <Heart />
        </Styles.HeartWrapper>
      </Styles.ReviewHeaderLeft>
      <Styles.SliderWrapper>
        {review.images && (
          <AwesomeSlider animation="cubeAnimation">
            {review.images?.map((r) => (
              <div data-src={r} />
            ))}
          </AwesomeSlider>
        )}
      </Styles.SliderWrapper>
    </Styles.ReviewHeader>
  );
};

type Props = {
  review: ReviewData;
};

export default ReviewArticleHero;
