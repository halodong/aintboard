import useSWRInfinite from "swr/infinite";
import { isEmpty } from "lodash";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import fetcher from "util/fetch";
import { FilterState } from "types/reduxTypes";
import { ReviewApiResponse, ReviewData } from "types/types";
import { ReviewCard } from "~/components/Reviews/ReviewCard";

import { ReviewsCardContainer, ReviewsPageWrapper } from "./styled";

const itemCount = 8;

const ReviewsPage = () => {
  const [items, setItems] = useState<any>([]);
  const filters = useSelector((state: FilterState) => state.filter.filters);
  const ref = useRef(true);
  const firstRender = ref.current;
  const currentFilter = useRef(filters?.secondSelected);

  const {
    data: filteredApiData,
    size,
    setSize,
  } = useSWRInfinite<ReviewApiResponse>((pageIndex: number) => {
    const index = pageIndex + 1;
    // todo: infinitescroll in filtered data
    return !isEmpty(filters?.secondSelected) && !firstRender
      ? `/api/review/filter/${filters.firstSelected}/${
          filters.secondSelected
        }?first=${index * itemCount}&approved=true`
      : `/api/reviews?first=${itemCount}&offset=${
          pageIndex * itemCount
        }&approved=true`;
  }, fetcher);

  useEffect(() => {
    // size-1 is the last index of the fetched data
    // note: we need to concat to the array state instead of updating it entirely,
    // for the infinite scroll to work, and not jump to the top
    if (currentFilter.current !== filters?.secondSelected) {
      //overwrite new items, when filter has been changed
      setItems(filteredApiData?.[size - 1]?.response?.data?.reviews || []);
    } else {
      //concat when infinite scrolling
      setItems(
        items.concat(filteredApiData?.[size - 1]?.response?.data?.reviews || [])
      );
    }

    currentFilter.current = filters?.secondSelected;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredApiData, filters?.secondSelected]);

  ref.current = false;

  return (
    <ReviewsPageWrapper>
      <InfiniteScroll
        dataLength={items.length}
        next={() => setSize(size + 1)}
        hasMore={filteredApiData?.[size - 1]?.response?.data?.hasMore || false}
        loader={<h3>Loading...</h3>}
      >
        <ReviewsCardContainer>
          {items.map((r: ReviewData) => (
            <ReviewCard key={r._id} data={r} />
          ))}
        </ReviewsCardContainer>
      </InfiniteScroll>
    </ReviewsPageWrapper>
  );
};

export default ReviewsPage;
