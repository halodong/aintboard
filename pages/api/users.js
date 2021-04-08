import nc from "next-connect";

import { getUsers } from "~/db/users";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const { first = null } = req.query;

  const users = await getUsers(req.db, {
    first,
  });

  return res.json(users);
});

export default handler;
