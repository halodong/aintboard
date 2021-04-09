import React from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { isEmpty } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

import fetcher from "util/fetch";
import { ChallengesPageWrapper, ChallengesCardContainer } from "./styled";
import ChallengesCard from "~/components/Challenges/ChallengesCard";

import {
  ChallengesApiResponse,
  ChallengesData,
  FilterState,
} from "types/types";

//Challenges page - where filters are
const ChallengesPage = ({ challenges }: Props) => {
  const filters = useSelector((state: FilterState) => state.filter.filters);

  const { data: filteredApiData } = useSWR<ChallengesApiResponse>(
    !isEmpty(filters?.secondSelected)
      ? `/api/challenge/filter/${filters.firstSelected}/${filters.secondSelected}?first=6`
      : null,
    fetcher,
    { initialData: challenges }
  );

  const challengesData = filteredApiData?.response?.data?.challenges || [];

  return (
    <ChallengesPageWrapper>
      <InfiniteScroll
        dataLength={challengesData.length}
        next={() => {}}
        hasMore={true}
        loader={<h3>Loading...</h3>}
      >
        <ChallengesCardContainer>
          {challengesData.map((c: ChallengesData, index) => (
            <ChallengesCard key={`${c.bgName}-${index}`} data={c} />
          ))}
        </ChallengesCardContainer>
      </InfiniteScroll>
    </ChallengesPageWrapper>
  );
};

type Props = {
  challenges: ChallengesApiResponse;
};

export default ChallengesPage;
