import nc from "next-connect";

import { getAllBattles, insertBattle } from "~/db/onlineBattle";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const {
    battleName,
    boardGameName,
    bgId,
    details,
    eventStartDate,
    eventEndDate,
  } = req.body;

  const battle = await insertBattle(req.db, {
    battleName,
    boardGameName,
    bgId,
    details,
    eventStartDate,
    eventEndDate,
  });

  return res.json({ battle });
});

handler.get(async (req, res) => {
  const { first = null } = req.query;

  const battles = await getAllBattles(req.db, { first });

  return res.json(battles);
});

export default handler;
