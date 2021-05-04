import nc from "next-connect";

import { filterUserChallenges } from "~/db/userChallenges";

import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const { filter, field, first = null } = req.query;

  const users = await filterUserChallenges(req.db, { filter, field, first });

  return res.json(users);
});

export default handler;
