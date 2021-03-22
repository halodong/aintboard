import nc from "next-connect";

import { getAllChallenges, insertChallenge } from "~/db/challenges";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { challengeName, bgId, bgName, bgYear, powerUpAmount } = req.body;

  const challenge = await insertChallenge(req.db, {
    challengeName,
    bgId,
    bgName,
    bgYear,
    powerUpAmount,
  });

  return res.json(challenge);
});

handler.get(async (req, res) => {
  const challenges = await getAllChallenges(req.db);

  return res.json(challenges);
});

export default handler;
