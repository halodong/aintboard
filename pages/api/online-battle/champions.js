import nc from "next-connect";

import { insertChampion } from "~/db/champion";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { userId, trophyType, battleId } = req.body;

  const champ = await insertChampion(req.db, {
    userId,
    trophyType,
    battleId,
  });

  return res.json({ champ });
});

export default handler;
