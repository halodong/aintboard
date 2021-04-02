import fetcher from "~/util/fetch";
import useSWR from "swr";

import Head from "next/head";
import Header from "~/components/Header";
import ReviewHomepage from "~/components/ReviewHomepage";

import { ReviewApiResponse } from "~/types/types";

export default function Home({ reviews }: Props) {
  const { data: reviewData } = useSWR<ReviewApiResponse>(
    "/api/reviews?first=5",
    fetcher,
    { initialData: reviews }
  );

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <div>
      <Head>
        <title>Ain't Board - Interactive Boardgame Community</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header homepage />

      <ReviewHomepage reviews={reviewData} />
    </div>
  );
}

type Props = {
  reviews: ReviewApiResponse;
};

export const getStaticProps = async () => {
  const reviews = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?first=5`
  );

  return {
    props: {
      reviews,
    },
  };
};
