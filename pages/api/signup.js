import nc from "next-connect";

import { insertUser } from "~/db/user";
import { all } from "~/middlewares/index";

const handler = nc();

handler.use(all);

handler.post(async (req, res) => {
  const {
    firstName = "",
    lastName = "",
    email,
    role = "guest",
    username,
    password,
    avatar,
    gcash = "",
  } = req.body;

  const user = await insertUser(req.db, {
    firstName,
    lastName,
    email,
    password,
    role,
    username,
    avatar,
    gcash,
  });

  return res.json(user);
});

export default handler;
