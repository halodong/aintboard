import nc from "next-connect";

import { likeReview } from "~/db/reviewLikes";
import { all, verifyToken } from "~/middlewares/index";

const handler = nc();

handler.use(all).use(verifyToken);

handler.post(async (req, res) => {
  const { userId, reviewId } = req.body;

  const reviewLike = await likeReview(req.db, {
    userId,
    reviewId,
  });

  // this token is from refreshing token in verifyToken
  reviewLike.token = req.jwtToken;

  return res.json(reviewLike);
});

export default handler;
