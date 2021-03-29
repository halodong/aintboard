import nc from "next-connect";

import { insertFollowBg } from "~/db/followBg";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { userId, bgId } = req.body;

  const follow = await insertFollowBg(req.db, {
    userId,
    bgId,
  });

  return res.json(follow);
});

export default handler;
