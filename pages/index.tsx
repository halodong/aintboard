import fetcher from "~/util/fetch";
import Head from "next/head";
import useSWR from "swr";

import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import Footer from "~/components/Common/Footer";
import ReviewHomepage from "~/components/Reviews/ReviewHomepage";
import ChallengesHomepage from "~/components/Challenges/ChallengesHomepage";

import { ReviewApiResponse, ChallengesApiResponse } from "~/types/types";

export default function Home({ reviews, challenges }: Props) {
  const { data: reviewData } = useSWR<ReviewApiResponse>(
    "/api/reviews?first=5",
    fetcher,
    { initialData: reviews }
  );

  const { data: challengesData } = useSWR<ChallengesApiResponse>(
    "/api/challenges?first=3",
    fetcher,
    { initialData: challenges }
  );

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <div>
      <Seo />
      {/* <Head>
        <title>Ain't Board - Interactive Boardgame Community</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <Header homepage />

      <ReviewHomepage reviews={reviewData} />
      <ChallengesHomepage challenges={challengesData} />

      <Footer />
    </div>
  );
}

type Props = {
  reviews: ReviewApiResponse;
  challenges: ChallengesApiResponse;
};

export const getStaticProps = async () => {
  const reviews = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?first=5`
  );

  const challenges = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/challenges?first=3`
  );

  return {
    props: {
      reviews,
      challenges,
    },
  };
};
