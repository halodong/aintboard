import nc from "next-connect";

import { useAvatar } from "~/db/avatar";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { userId, icon } = req.body;

  const userWithAvatar = await useAvatar(req.db, {
    userId,
    icon,
  });

  return res.json(userWithAvatar);
});

export default handler;
