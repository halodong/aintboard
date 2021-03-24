import { useRouter } from "next/router";

const BoardgamePage = () => {
  const router = useRouter();
  const { bgId } = router.query;

  return <div>{bgId}</div>;
};

export default BoardgamePage;
