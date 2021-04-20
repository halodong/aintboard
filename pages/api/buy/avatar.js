import nc from "next-connect";

import { buyAvatar } from "~/db/avatar";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { userId, icon, powerups } = req.body;

  const userAvatar = await buyAvatar(req.db, {
    userId,
    icon,
    powerups,
  });

  return res.json({ userAvatar });
});

export default handler;
