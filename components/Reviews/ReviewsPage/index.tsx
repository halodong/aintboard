import React from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { isEmpty } from "lodash";
import fetcher from "util/fetch";

import { FilterState } from "types/reduxTypes";
import { ReviewApiResponse, ReviewData } from "types/types";

import InfiniteScroll from "react-infinite-scroll-component";
import { ReviewCard } from "~/components/Reviews/ReviewCard";

import { ReviewsCardContainer, ReviewsPageWrapper } from "./styled";
const ReviewsPage = ({ reviews }: Props) => {
  const filters = useSelector((state: FilterState) => state.filter.filters);

  const { data: filteredApiData } = useSWR<ReviewApiResponse>(
    // TODO FILTER
    !isEmpty(filters?.secondSelected)
      ? `/api/review/filter/${filters.firstSelected}/${filters.secondSelected}?first=8`
      : null,
    fetcher,
    { initialData: reviews }
  );

  const reviewsData = filteredApiData?.response?.data?.reviews || [];
  if (typeof window === "undefined") {
    return <></>;
  }

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

type Props = {
  reviews: ReviewApiResponse;
};

export default ReviewsPage;
