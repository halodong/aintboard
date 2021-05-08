import Seo from "~/components/Common/Seo";
import Header from "~/components/Header/";
import OnlineBattle from "~/components/OnlineBattle";

import { getBattles } from "db/onlineBattle";
import database from "middlewares/dbForFrontend";
import { BattlesApiResponse } from "~/types/types";

const OnlineBattles = ({ battleResponse }: Props) => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="Online Battles"
        description="Play a boardgame and get on top of the leaderboards to win trophies"
        canonical="/online-battles"
      />
      <Header isOnlineBattles />
      <OnlineBattle battleResponse={battleResponse} />
    </>
  );
};

type Props = {
  battleResponse: BattlesApiResponse;
};

export default OnlineBattles;

export async function getStaticProps() {
  const db = await database();
  const battleResponse = await getBattles(db, { first: null });

  return {
    props: {
      battleResponse,
    },
  };
}
