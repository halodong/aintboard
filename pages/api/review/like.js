import nc from "next-connect";

import { likeReview, getLikes } from "~/db/reviewLikes";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const { reviewId } = req.query;

  const reviews = await getLikes(req.db, {
    reviewId,
  });

  return res.json(reviews);
});

handler.post(async (req, res) => {
  const { userId, reviewId } = req.body;

  const reviewLike = await likeReview(req.db, {
    userId,
    reviewId,
  });

  // this token is from refreshing token in verifyToken
  // reviewLike.token = req.jwtToken;

  return res.json(reviewLike);
});

export default handler;
