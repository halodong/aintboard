import nc from "next-connect";

import { filterUsers } from "~/db/user";
import { all } from "~/middlewares";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const { filter, field, first = null } = req.query;

  const users = await filterUsers(req.db, { filter, field, first });

  return res.json(users);
});

export default handler;
