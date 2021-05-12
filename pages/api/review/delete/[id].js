import nc from "next-connect";

import { deleteReview } from "~/db/reviews";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.delete(async (req, res) => {
  const { id } = req.query;

  const review = await deleteReview(req.db, { id });

  return res.json(review);
});

export default handler;
