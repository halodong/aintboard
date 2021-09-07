import nc from "next-connect";

import { deleteChallenge } from "~/db/challenges";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.delete(async (req, res) => {
  const { id } = req.query;

  const review = await deleteChallenge(req.db, { id });

  return res.json(review);
});

export default handler;
