import nc from "next-connect";

import { filterChampions } from "~/db/champion";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const { filter, field, first = null } = req.query;

  const onlineBattles = await filterChampions(req.db, { filter, field, first });

  return res.json(onlineBattles);
});

export default handler;
