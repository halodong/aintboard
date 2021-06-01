import nc from "next-connect";

import { getAllChallenges, insertChallenge } from "~/db/challenges";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const {
    createdBy,
    challengeName,
    bgId,
    bgName,
    bgYear,
    bgImage,
    powerUpAmount,
    status,
  } = req.body;

  const challenge = await insertChallenge(req.db, {
    createdBy,
    challengeName,
    bgId,
    bgImage,
    bgName,
    bgYear,
    powerUpAmount,
    status,
  });

  return res.json(challenge);
});

handler.get(async (req, res) => {
  const { first = null, offset = null } = req.query;

  const challenges = await getAllChallenges(req.db, { first, offset });

  return res.json(challenges);
});

export default handler;
