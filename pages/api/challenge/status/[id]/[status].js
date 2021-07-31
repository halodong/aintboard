import nc from "next-connect";

import { challengeStatus } from "~/db/challenges";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.patch(async (req, res) => {
  const { id, status } = req.query;

  const review = await challengeStatus(req.db, { status, id });

  return res.json(review);
});
export default handler;
