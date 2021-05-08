import nc from "next-connect";

import { getUserLikes } from "db/reviewLikes";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const { userId, reviewId } = req.query;

  const reviews = await getUserLikes(req.db, {
    reviewId,
    userId,
  });

  return res.json(reviews);
});

export default handler;
