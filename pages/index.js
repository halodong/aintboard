import fetcher from "@/util/fetch";
import { isEmpty } from "lodash";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

import styles from "../styles/Home.module.css";

import Paginate from "./../components/Paginate";

export default function Home() {
  const { data } = useSWR("/api/bg-items?itemName=throne", fetcher);
  const [dataFromPaginate, setDataFromPaginate] = useState(null);
  const [bgPerPage] = useState(10);

  const renderUserList = () => {
    if (isEmpty(data.items) || isEmpty(data.items[0])) {
      return false;
    }
    return dataFromPaginate
      ? dataFromPaginate.map((bg, i) => (
          <div key={i}>{bg.name[0]._attributes.value}</div>
        ))
      : data.items[0].item.map((bg, i) => {
          if (i < bgPerPage) {
            return <div key={i}>{bg.name[0]._attributes.value} test</div>;
          } else {
            return null;
          }
        });
  };

  const updateDataFromPaginate = (data) => {
    setDataFromPaginate(data);
  };

  return (
    <div className={styles.container}>
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
}
