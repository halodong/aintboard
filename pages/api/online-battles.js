import nc from "next-connect";

import { insertBattle } from "~/db/onlineBattle";
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

export default handler;
