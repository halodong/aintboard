import nc from "next-connect";

import { deleteUser } from "~/db/users";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.delete(async (req, res) => {
  const { id } = req.query;

  const review = await deleteUser(req.db, { id });

  return res.json(review);
});

export default handler;
