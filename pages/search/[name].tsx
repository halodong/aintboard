import fetcher from "~/util/fetch";
import { isEmpty } from "lodash";
import Head from "next/head";
import { useState, useMemo } from "react";
import useSWR from "swr";

import Paginate from "~/components/Paginate/Paginate";
import Header from "~/components/Header";

import { BggBoardgameApiData, BggBoardgameData } from "~/types/types";

const Search = ({ query }: Props) => {
  const { data: bgData } = useSWR<BggBoardgameApiData>(
    `/api/bg-items?itemName=${query.name}`,
    fetcher
  );

  const [dataFromPaginate, setDataFromPaginate] = useState<
    BggBoardgameData[] | null
  >(null);
  const [bgPerPage] = useState(10);

  const renderUserList = useMemo(() => {
    if (isEmpty(bgData?.items) || isEmpty(bgData?.items[0])) {
      return false;
    }

    return dataFromPaginate
      ? dataFromPaginate.map((bg, i) => (
          <div key={i}>{bg.name[0]._attributes.value}</div>
        ))
      : bgData?.items[0].item.map((bg, i) => {
          if (i < bgPerPage) {
            return <div key={i}>{bg.name[0]._attributes.value} test</div>;
          } else {
            return null;
          }
        });
  }, [dataFromPaginate, bgData, bgPerPage]);

  const updateDataFromPaginate = (data: BggBoardgameData[]) => {
    setDataFromPaginate(data);
  };

  return (
    <div>
      <Head>
        <title>Ain't Board</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {bgData?.items ? (
        <Paginate
          data={bgData.items[0].item}
          setData={updateDataFromPaginate}
          itemsPerPage={bgPerPage}
        />
      ) : null}

      {bgData?.items && renderUserList}
    </div>
  );
};

Search.getInitialProps = ({ query }: Props) => {
  return { query };
};

type Props = {
  query: {
    name: string;
  };
};

export default Search;
