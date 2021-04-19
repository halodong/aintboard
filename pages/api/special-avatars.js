import nc from "next-connect";

import { getSpecialAvatars, insertSpecialAvatar } from "~/db/specialAvatars";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const avatars = await getSpecialAvatars(req.db);

  return res.json(avatars);
});

handler.post(async (req, res) => {
  const { createdBy, icon, powerUpAmount } = req.body;

  const specialAvatar = await insertSpecialAvatar(req.db, {
    createdBy,
    icon,
    powerUpAmount,
  });

  return res.json(specialAvatar);
});

export default handler;
