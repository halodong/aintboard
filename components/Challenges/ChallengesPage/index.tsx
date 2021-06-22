import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSWRInfinite } from "swr";
import { isEmpty } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

import ChallengesCard from "~/components/Challenges/ChallengesCard";

import fetcher from "util/fetch";
import { FilterState } from "types/reduxTypes";
import { CHALLENGES_ITEM_COUNT } from "util/constants";
import { ChallengesApiResponse, ChallengesData } from "types/types";
import { ChallengesPageWrapper, ChallengesCardContainer } from "./styled";

const itemCount = CHALLENGES_ITEM_COUNT;
//Challenges page - where filters are
const ChallengesPage = () => {
  const ref = useRef(true);
  const firstRender = ref.current;
  const [items, setItems] = useState<any>([]);
  const filters = useSelector((state: FilterState) => state.filter.filters);
  const currentFilter = useRef(filters?.secondSelected);

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
    if (currentFilter.current !== filters?.secondSelected) {
      //overwrite new items, when filter has been changed
      setItems(filteredApiData?.[size - 1]?.response?.data?.challenges || []);
    } else {
      //concat when infinite scrolling
      setItems(
        items.concat(
          filteredApiData?.[size - 1]?.response?.data?.challenges || []
        )
      );
    }

    currentFilter.current = filters?.secondSelected;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredApiData, filters?.secondSelected]);

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
