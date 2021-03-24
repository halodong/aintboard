import nc from "next-connect";

import { insertValidEntry } from "~/db/validEntry";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const {
    battleId,
    score,
    message,
    googleLink,
    verifiedStatus = "pending",
  } = req.body;

  const entry = await insertValidEntry(req.db, {
    battleId,
    score,
    message,
    googleLink,
    verifiedStatus,
  });

  return res.json({ entry });
});

export default handler;
