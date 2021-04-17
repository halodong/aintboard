import nc from "next-connect";

import { insertReview, getReviews } from "~/db/reviews";
import { all } from "~/middlewares/index";
import { REVIEW_STATUS, REVIEW_TYPE } from "util/constants";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const {
    userId,
    username,
    bgName,
    reviewContent,
    reviewStatus = REVIEW_STATUS.PENDING,
    reviewType = REVIEW_TYPE.REVIEW,
    replayabilityRating,
    componentsRating,
    complexityRating,
    aestheticsRating,
    valueForMoneyRating,
    playingTimeRating,
    overallRating,
    images,
    reviewTitle,
    language,
    youtubeUrl,
  } = req.body;

  const review = await insertReview(req.db, {
    userId,
    username,
    bgName,
    reviewContent,
    reviewStatus,
    reviewType,
    replayabilityRating,
    componentsRating,
    complexityRating,
    aestheticsRating,
    valueForMoneyRating,
    playingTimeRating,
    overallRating,
    images,
    reviewTitle,
    language,
    youtubeUrl,
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
