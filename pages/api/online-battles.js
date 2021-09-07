import nc from "next-connect";

import { getBattles, insertBattle } from "~/db/onlineBattle";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const {
    battleName,
    boardGameName,
    bgImage,
    details,
    eventStartDate,
    eventEndDate,
    createdBy,
    status,
  } = req.body;

  const battle = await insertBattle(req.db, {
    battleName,
    boardGameName,
    bgImage,
    details,
    eventStartDate,
    eventEndDate,
    createdBy,
    status,
  });

  return res.json(battle);
});

handler.get(async (req, res) => {
  const { first = null, offset = null } = req.query;

  const battles = await getBattles(req.db, { first, offset });

  return res.json(battles);
});

export default handler;
