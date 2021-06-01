import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSWRInfinite } from "swr";
import { isEmpty } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

import fetcher from "util/fetch";
import { ChallengesPageWrapper, ChallengesCardContainer } from "./styled";
import ChallengesCard from "~/components/Challenges/ChallengesCard";

import { ChallengesApiResponse, ChallengesData } from "types/types";
import { FilterState } from "types/reduxTypes";

const itemCount = 6;
//Challenges page - where filters are
const ChallengesPage = () => {
  const [items, setItems] = useState<any>([]);
  const filters = useSelector((state: FilterState) => state.filter.filters);
  const ref = useRef(true);
  const firstRender = ref.current;

  const {
    data: filteredApiData,
    size,
    setSize,
  } = useSWRInfinite<ChallengesApiResponse>((pageIndex: number) => {
    const index = pageIndex + 1;

    return !isEmpty(filters?.secondSelected) && !firstRender
      ? `/api/challenge/filter/${filters.firstSelected}/${
          filters.secondSelected
        }?first=${index * itemCount}`
      : `/api/challenges?first=${itemCount}&offset=${pageIndex * itemCount}`;
  }, fetcher);

  useEffect(() => {
    setItems(
      items.concat(
        filteredApiData?.[size - 1]?.response?.data?.challenges || []
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredApiData]);

  ref.current = false;

  return (
    <ChallengesPageWrapper>
      <InfiniteScroll
        dataLength={items.length}
        next={() => setSize(size + 1)}
        hasMore={filteredApiData?.[size - 1]?.response?.data?.hasMore || false}
        loader={<h3>Loading...</h3>}
      >
        <ChallengesCardContainer>
          {items.map((c: ChallengesData, index: number) => (
            <ChallengesCard key={`${c.bgName}-${index}`} data={c} />
          ))}
        </ChallengesCardContainer>
      </InfiniteScroll>
    </ChallengesPageWrapper>
  );
};

export default ChallengesPage;
