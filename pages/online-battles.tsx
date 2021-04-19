import Header from "~/components/Header/";
import OnlineBattle from "~/components/OnlineBattle";
import fetcher from "~/util/fetch";
import { BattlesApiResponse } from "~/types/types";

const OnlineBattles = ({ battleResponse }: Props) => {
  return (
    <>
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
  const battleResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/online-battles`
  );

  return {
    props: {
      battleResponse,
    },
  };
}
