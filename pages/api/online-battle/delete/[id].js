import nc from "next-connect";

import { deleteOnlineBattle } from "~/db/onlineBattle";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.delete(async (req, res) => {
  const { id } = req.query;

  const onlineBattle = await deleteOnlineBattle(req.db, { id });

  return res.json(onlineBattle);
});

export default handler;
