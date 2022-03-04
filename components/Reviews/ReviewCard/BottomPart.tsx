import useSWR from "swr";
import { capitalize } from "lodash";

import { Bottom, BottomRight, BottomWrapper } from "./styled";
import fetcher from "util/fetch";
import HeartIcon from "assets/img/Heart";
import likeReview from "util/likeReview";
import { REVIEW_TYPE } from "~/util/constants";
import useCurrentUser from "hooks/useCurrentUser";
import OverallRating from "components/Common/OverallRating";
import {
  ReviewData,
  ReviewLikesApiResponse,
  UserApiResponse,
} from "types/types";

const BottomPart = ({ data }: Props) => {
  const review = data;
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

  return (
    <BottomWrapper>
      <Bottom compType={data?.reviewType}>
        {data?.reviewType === REVIEW_TYPE.REVIEW && (
          <OverallRating
            rating={data.overallRating}
            paddingBottom="0"
            noPointer
          />
        )}

        <BottomRight>
          <h6>{capitalize(data.reviewType)}</h6>

          <button
            className="heart-wrapper"
            onClick={() => likeReview({ userObj, review })}
          >
            <span>{reviewLikesApiData?.response?.totalLikes || 0}</span>
            <HeartIcon />
          </button>
        </BottomRight>
      </Bottom>
    </BottomWrapper>
  );
};

type Props = {
  data: ReviewData;
};

export default BottomPart;
