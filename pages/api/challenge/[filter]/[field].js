import nc from "next-connect";

import { filterChallenges } from "~/db/challenges";
import { all } from "~/middlewares";

const handler = nc({ attachParams: true });

handler.use(all);

handler.get(async (req, res) => {
  const filter = req.query.filter;
  const field = parseInt(req.query.field);

  const challenges = await filterChallenges(req.db, { filter, field });

  return res.json(challenges);
});

export default handler;
