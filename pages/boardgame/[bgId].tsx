import { useRouter } from "next/router";

import Header from "~/components/Header";
import BoardGamePage from "~/components/BoardGamePage";

const BoardgamePage = () => {
  const router = useRouter();
  const { bgId } = router.query;

  return (
    <div>
      <Header isBoardGamePage>
        Boardgame Name <br /> {bgId}
      </Header>

      <BoardGamePage />
    </div>
  );
};

export default BoardgamePage;
