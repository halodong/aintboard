import nc from "next-connect";

import { reviewStatus } from "~/db/reviews";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.patch(async (req, res) => {
  const { id, status } = req.query;

  const review = await reviewStatus(req.db, { status, id });

  return res.json(review);
});

export default handler;
