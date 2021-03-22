import fetcher from "~/util/fetch";
import { isEmpty } from "lodash";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

import Paginate from "~/components/Paginate/Paginate";

import { BggBoardgameApiData, BggBoardgameData } from "~/types/types";

const Search = () => {
  const { data } = useSWR<BggBoardgameApiData>(
    "/api/bg-items?itemName=throne",
    fetcher
  );
  const [dataFromPaginate, setDataFromPaginate] = useState<
    BggBoardgameData[] | null
  >(null);
  const [bgPerPage] = useState(10);

  const renderUserList = () => {
    if (isEmpty(data?.items) || isEmpty(data?.items[0])) {
      return false;
    }

    return dataFromPaginate
      ? dataFromPaginate.map((bg, i) => (
          <div key={i}>{bg.name[0]._attributes.value}</div>
        ))
      : data?.items[0].item.map((bg, i) => {
          if (i < bgPerPage) {
            return <div key={i}>{bg.name[0]._attributes.value} test</div>;
          } else {
            return null;
          }
        });
  };

  const updateDataFromPaginate = (data: BggBoardgameData[]) => {
    setDataFromPaginate(data);
  };

  return (
    <div>
      <Head>
        <title>Ain't Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {data?.items ? (
        <Paginate
          data={data.items[0].item}
          setData={updateDataFromPaginate}
          itemsPerPage={bgPerPage}
        />
      ) : null}

      {data?.items && renderUserList()}
    </div>
  );
};

export default Search;
