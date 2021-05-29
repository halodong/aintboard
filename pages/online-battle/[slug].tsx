import React from "react";
import { filterOnlineBattles, getBattles } from "~/db/onlineBattle";
import database from "middlewares/dbForFrontend";
import { OnlineBattlesApiResponse, OnlineBattlesData } from "~/types/types";
import { FALLBACK } from "~/util/constants";

import Header from "~/components/Header";
import OnlineBattleHeader from "~/components/OnlineBattlePage/Header";
import OnlineBattlePage from "~/components/OnlineBattlePage";
import Footer from "~/components/Common/Footer";

const Slug = ({ onlineBattleData }: Props) => {
  const onlineBattle = onlineBattleData?.response?.data?.onlineBattles[0];

  return (
    <div>
      <Header isOnlineBattlePage>
        <OnlineBattleHeader onlineBattle={onlineBattle} />
      </Header>
      <OnlineBattlePage onlineBattle={onlineBattle} />
      <Footer />
    </div>
  );
};

type Props = {
  onlineBattleData: OnlineBattlesApiResponse;
};

export default Slug;

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const { slug } = params;

  const db = await database();
  const onlineBattleData = await filterOnlineBattles(db, {
    filter: "slug",
    field: slug,
    first: null,
  });

  if (onlineBattleData?.response?.data?.onlineBattles < 1) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      onlineBattleData,
    },
  };
};

export const getStaticPaths = async () => {
  const db = await database();
  const response = await getBattles(db, { first: 1 });

  const pathsData =
    response?.success &&
    response?.response?.data?.onlineBattles &&
    response?.response?.data?.onlineBattles.map(
      (onlineBattle: OnlineBattlesData) => {
        return { params: { slug: onlineBattle?.slug } };
      }
    );

  return {
    paths: pathsData || [],
    fallback: FALLBACK,
  };
};
