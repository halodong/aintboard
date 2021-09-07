import nc from "next-connect";

import { OnlineBattleStatus } from "~/db/onlineBattle";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.patch(async (req, res) => {
  const { id, status } = req.query;

  const onlineBattle = await OnlineBattleStatus(req.db, { status, id });

  return res.json(onlineBattle);
});

export default handler;
