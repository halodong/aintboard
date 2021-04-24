import nc from "next-connect";

import { getBattles } from "~/db/onlineBattle";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const { first = null } = req.query;

  const battles = await getBattles(req.db, { first });

  return res.json(battles);
});

export default handler;
