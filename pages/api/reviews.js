import nc from "next-connect";

import { insertReview, getReviews } from "~/db/reviews";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const {
    userId,
    bgId,
    reviewText,
    reviewStatusId,
    reviewType = "review",
  } = req.body;

  const review = await insertReview(req.db, {
    userId,
    bgId,
    reviewText,
    reviewStatusId,
    reviewType,
  });

  return res.json(review);
});

handler.get(async (req, res) => {
  const { first = null } = req.query;

  const reviews = await getReviews(req.db, {
    first,
  });

  return res.json(reviews);
});

export default handler;
