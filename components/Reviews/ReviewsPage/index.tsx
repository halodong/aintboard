import { useRef } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { isEmpty } from "lodash";
import fetcher from "util/fetch";

import { FilterState } from "types/reduxTypes";
import { ReviewApiResponse, ReviewData } from "types/types";

import InfiniteScroll from "react-infinite-scroll-component";
import { ReviewCard } from "~/components/Reviews/ReviewCard";

import { ReviewsCardContainer, ReviewsPageWrapper } from "./styled";
const ReviewsPage = () => {
  const filters = useSelector((state: FilterState) => state.filter.filters);
  const ref = useRef(true);
  const firstRender = ref.current;

  const { data: filteredApiData } = useSWR<ReviewApiResponse>(
    !isEmpty(filters?.secondSelected) && !firstRender
      ? `/api/review/filter/${filters.firstSelected}/${filters.secondSelected}?first=8`
      : `/api/reviews?first=8`,
    fetcher
  );

  const reviewsData = filteredApiData?.response?.data?.reviews || [];
  ref.current = false;

  return (
    <ReviewsPageWrapper>
      <InfiniteScroll
        dataLength={reviewsData.length}
        next={() => {}}
        hasMore={true}
        loader={<h3>Loading...</h3>}
      >
        <ReviewsCardContainer>
          {reviewsData.map((r: ReviewData) => (
            <ReviewCard key={r._id} data={r} />
          ))}
        </ReviewsCardContainer>
      </InfiniteScroll>
    </ReviewsPageWrapper>
  );
};

export default ReviewsPage;
