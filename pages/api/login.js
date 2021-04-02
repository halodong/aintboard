import nc from "next-connect";

import { all } from "~/middlewares/index";
import { authenticateUser } from "~/db/user";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const { email = "", username = "", password } = JSON.parse(req.body);

  const user = await authenticateUser(req.db, {
    email,
    username,
    password,
  });

  return res.json(user);
});

export default handler;
