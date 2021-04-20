import nc from "next-connect";

import { getUserAvatars } from "~/db/avatar";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const { userId } = req.query;

  const userAvatars = await getUserAvatars(req.db, {
    userId,
  });

  return res.json(userAvatars);
});

export default handler;
