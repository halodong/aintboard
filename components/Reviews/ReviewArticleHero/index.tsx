import useSWR from "swr";
import Image from "next/image";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";

import Button from "~/components/Common/Button";
import OverallRating from "~/components/Common/OverallRating";

import fetcher from "util/fetch";
import Heart from "assets/img/Heart";
import likeReview from "util/likeReview";
import useCurrentUser from "hooks/useCurrentUser";
import {
  ReviewData,
  ReviewLikesApiResponse,
  UserApiResponse,
} from "types/types";

import * as Styles from "./styled";

const ReviewArticleHero = ({ review }: Props) => {
  const [userHasLiked, setUserHasLiked] = useState(false);
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

  useEffect(() => {
    if (userObj?._id && reviewLikesApiData?.response?.usersWhoLiked) {
      const usersWhoLiked = reviewLikesApiData?.response?.usersWhoLiked;

      for (let user of usersWhoLiked) {
        if (user?.userId === userObj?._id) {
          setUserHasLiked(true);
        }
      }
    }
  }, [reviewLikesApiData?.response?.usersWhoLiked, userObj?._id]);

  const onClickLikeReview = () => {
    if (userHasLiked) {
      toast.error("You can't dislike a review");
    } else {
      likeReview({ userObj, review });
    }
  };

  return (
    <Styles.ReviewHeader>
      <Styles.ReviewHeaderLeft>
        {review?.language && <Button bg="white">{review.language}</Button>}
        <Styles.OverallRating>
          <OverallRating rating={review.overallRating} big noPointer />
          <span>{review.overallRating}</span>
        </Styles.OverallRating>
        <Styles.HeartWrapper onClick={onClickLikeReview}>
          <span>{reviewLikesApiData?.response?.totalLikes || 0}</span>
          <Heart />
        </Styles.HeartWrapper>
      </Styles.ReviewHeaderLeft>
      <Styles.SliderWrapper>
        {review?.images.length ? (
          <AwesomeSlider
            animation="cubeAnimation"
            style={{ width: "43.563rem", height: "21.063rem" }}
          >
            {review.images?.map((r, i) => (
              <div key={`awesome-slider-${i}`} data-src={r} />
            ))}
          </AwesomeSlider>
        ) : (
          <Styles.DefaultImageWrapper>
            <Image
              alt="online battle cover photo"
              src="/img/landscape_default.png"
              layout="fill"
              objectFit="contain"
            />
          </Styles.DefaultImageWrapper>
        )}
      </Styles.SliderWrapper>
    </Styles.ReviewHeader>
  );
};

type Props = {
  review: ReviewData;
};

export default ReviewArticleHero;
