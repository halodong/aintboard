import useSWR from "swr";

import Header from "components/Header";
import Footer from "components/Common/Footer";
import BuyAvatar from "components/Avatar/BuyAvatar";

import database from "middlewares/dbForFrontend";
import { getSpecialAvatars } from "db/specialAvatars";

import fetcher from "~/util/fetch";
import { SpecialAvatarsApiResponse } from "~/types/types";

const BuyAvatarsPage = ({ specialAvatars }: Props) => {
  const { data: specialAvatarsData } = useSWR<SpecialAvatarsApiResponse>(
    "/api/special-avatars",
    fetcher,
    { initialData: specialAvatars, revalidateOnMount: true }
  );

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <>
      <Header isBuyAvatarsPage centerTagline="Buy Avatars" />
      <BuyAvatar
        specialAvatars={specialAvatarsData?.response?.data?.avatars || []}
      />
      <Footer />
    </>
  );
};

type Props = {
  specialAvatars: SpecialAvatarsApiResponse;
};

export default BuyAvatarsPage;

export async function getStaticProps() {
  const db = await database();
  const specialAvatars = await getSpecialAvatars(db);

  return {
    props: {
      specialAvatars,
    },
  };
}
