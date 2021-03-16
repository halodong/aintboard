import nc from "next-connect";

import { commentReview } from "~/db/reviewComments";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { userId, reviewId, comment } = req.body;

  const reviewComment = await commentReview(req.db, {
    userId,
    reviewId,
    comment,
  });

  return res.json(reviewComment);
});

export default handler;
