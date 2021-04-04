import Header from "~/components/Header";
import BoardGamePage from "~/components/BoardGamePage";
import fetcher from "~/util/fetch";

import { ReviewApiResponse, BggBoardgameApiData } from "~/types/types";

const BoardgamePage = ({ reviews, bgData }: Props) => {
  const bgItem = bgData?.items?.[0]?.item?.[0] || null;

  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <div>
      <Header isBoardGamePage>
        {/* primary name */}
        {bgItem?.name?.[0]?._attributes?.value}
        {/* secondary name wrapped in parenthesis */}
        {bgItem?.name?.[1] ? (
          <>
            <br />({bgItem?.name?.[1]._attributes?.value})
          </>
        ) : (
          ""
        )}
      </Header>

      <BoardGamePage reviews={reviews} bgItem={bgItem} />
    </div>
  );
};

type Props = {
  reviews: ReviewApiResponse;
  bgData: BggBoardgameApiData;
};

export default BoardgamePage;

type Params = {
  params: {
    bgId: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const { bgId } = params;

  const bgData = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bg/${bgId}`
  );

  const reviews = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/review/filter/bgId/${bgId}?first=4`
  );

  return {
    props: {
      reviews,
      bgData,
    },
  };
}

export async function getStaticPaths() {
  /**
   * Fallback Enable statically generating additional pages
   *
   * If we implement static pages to be generated at build time, then
   * possible paths: [{ params: { state: "wa", region: "sydney-3" } }],
   *
   * @see https://nextjs.org/docs/basic-features/data-fetching#fallback-true
   */
  return {
    paths: [],
    fallback: "blocking",
  };
}
