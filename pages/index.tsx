import useSWR from "swr";
import { useState, useEffect } from "react";

import Header from "~/components/Header";
import Seo from "~/components/Common/Seo";
import Footer from "~/components/Common/Footer";
import ReviewHomepage from "~/components/Reviews/ReviewHomepage";
import ChallengesHomepage from "~/components/Challenges/ChallengesHomepage";

import fetcher from "~/util/fetch";
import { getReviews } from "db/reviews";
import database from "middlewares/dbForFrontend";
import { getAllChallenges } from "db/challenges";
import { ReviewApiResponse, ChallengesApiResponse } from "~/types/types";

export default function Home({ reviews, challenges }: Props) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const { data: reviewData } = useSWR<ReviewApiResponse>(
    `/api/reviews?first=${
      windowWidth !== 0 && windowWidth <= 600 ? 2 : 5
    }&approved=true`,
    fetcher,
    { fallbackData: reviews, revalidateOnMount: true }
  );

  const { data: challengesData } = useSWR<ChallengesApiResponse>(
    "/api/challenges?first=3",
    fetcher,
    { fallbackData: challenges, revalidateOnMount: true }
  );

  return (
    <div>
      <Seo
        isHomepage
        title="Ain't Board"
        description="Interactive Boardgame Community"
      />

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
  const db = await database();
  const challenges = await getAllChallenges(db, { first: 3, offset: null });
  const reviews = await getReviews(db, {
    first: 5,
    offset: null,
    approved: "true",
  });

  return {
    props: {
      reviews,
      challenges,
    },
  };
};
