import nc from "next-connect";

import { all } from "~/middlewares/index";
import { authenticateAdmin } from "~/db/user";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { email = "", username = "", password } = req.body;

  const user = await authenticateAdmin(req.db, {
    email,
    username,
    password,
  });

  return res.json(user);
});

export default handler;
