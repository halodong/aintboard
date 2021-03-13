import nc from "next-connect";

import { insertReview } from "~/db/reviews";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { userId, bgId, reviewText } = req.body;

  const review = await insertReview(req.db, {
    userId,
    bgId,
    reviewText,
  });

  return res.json({ review });
});

export default handler;
