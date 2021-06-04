import React, { useState, useEffect, useRef } from "react";
import OnlineBattleCard from "~/components/OnlineBattleCard";
import { BattleCardWrapper } from "./styles";

import { BattlesApiResponse, BattlesData } from "~/types/types";
import { useSelector } from "react-redux";
import { FilterState } from "~/types/reduxTypes";
import { useSWRInfinite } from "swr";
import { isEmpty } from "lodash";
import fetcher from "~/util/fetch";
import InfiniteScroll from "react-infinite-scroll-component";

const itemCount = 6;

const OnlineBattle = () => {
  const [items, setItems] = useState<any>([]);
  const filters = useSelector((state: FilterState) => state.filter.filters);
  const ref = useRef(true);
  const firstRender = ref.current;

  const {
    data: filteredApiData,
    size,
    setSize,
  } = useSWRInfinite<BattlesApiResponse>((pageIndex: number) => {
    const index = pageIndex + 1;

    return !isEmpty(filters?.secondSelected) && !firstRender
      ? `/api/online-battles/filter/${
          filters.firstSelected
        }/${encodeURIComponent(filters.secondSelected || "")}?first=${
          index * itemCount
        }`
      : `/api/online-battles?first=${itemCount}&offset=${
          pageIndex * itemCount
        }`;
  }, fetcher);

  useEffect(() => {
    setItems(
      items.concat(filteredApiData?.[size - 1]?.response?.data?.battles || [])
    );
    console.log(filteredApiData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredApiData]);

  ref.current = false;

  return (
    <BattleCardWrapper>
      <InfiniteScroll
        dataLength={items.length}
        next={() => setSize(size + 1)}
        hasMore={filteredApiData?.[size - 1]?.response?.data?.hasMore || false}
        loader={<h3>Loading...</h3>}
      >
        {items.map((b: BattlesData) => (
          <OnlineBattleCard key={b._id} data={b} />
        ))}
      </InfiniteScroll>
    </BattleCardWrapper>
  );
};

export default OnlineBattle;
