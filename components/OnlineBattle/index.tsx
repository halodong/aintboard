import { useState, useEffect, useRef } from "react";
import OnlineBattleCard from "~/components/OnlineBattleCard";
import { BattleCardContainer, BattleCardWrapper } from "./styles";

import { OnlineBattlesApiResponse, OnlineBattlesData } from "~/types/types";
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
  } = useSWRInfinite<OnlineBattlesApiResponse>((pageIndex: number) => {
    const index = pageIndex + 1;

    return !isEmpty(filters?.secondSelected) && !firstRender
      ? `/api/online-battles/filter/${filters.firstSelected}/${
          filters.secondSelected
        }?first=${index * itemCount}&offset=${pageIndex * itemCount}`
      : `/api/online-battles?first=${itemCount}&offset=${
          pageIndex * itemCount
        }`;
  }, fetcher);

  useEffect(() => {
    if (filters.secondSelected) items.length = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.secondSelected]);

  useEffect(() => {
    // Using .concat(), no wrapper function (not recommended)
    //setItems(items.concat(query))

    // Using .concat(), wrapper function (recommended)
    //setItems(items => items.concat(query))
    setItems((items: any[]) =>
      items.concat(
        filters.secondSelected
          ? filteredApiData?.[size - 1]?.response?.data?.onlineBattles[0]
              .battles || []
          : filteredApiData?.[size - 1]?.response?.data?.onlineBattles || []
      )
    );

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
        <BattleCardContainer className="box">
          {items.map((b: OnlineBattlesData, index: number) => (
            <OnlineBattleCard key={`${b._id}-${index}`} data={b} />
          ))}
        </BattleCardContainer>
      </InfiniteScroll>
    </BattleCardWrapper>
  );
};

export default OnlineBattle;
