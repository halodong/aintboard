import { useDispatch } from "react-redux";

import fetcher from "~/util/fetch";
import Header from "~/components/Header";
import BoardGamePage from "~/components/BoardGamePage";

import { ReviewApiResponse, BggBoardgameApiData } from "~/types/types";
import { searchBg } from "redux/slices/bgSlice";

const BoardgamePage = ({ reviews, bgData }: Props) => {
  const bgItem = bgData?.items?.[0]?.item?.[0] || null;
  const dispatch = useDispatch();

  if (typeof window === "undefined") {
    return <></>;
  }

  dispatch(
    searchBg({
      bgName: bgItem?.name?.[0]?._attributes?.value || "",
      bgId: bgItem?._attributes?.id || "",
      bgYear: bgItem?.yearpublished?.[0]?._attributes?.value || "",
      bgImage: bgItem?.image?.[0]?._text?.[0] || "",
    })
  );

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
