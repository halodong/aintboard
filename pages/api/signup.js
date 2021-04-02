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
  } = JSON.parse(req.body);

  const user = await insertUser(req.db, {
    firstName,
    lastName,
    email,
    password,
    role,
    username,
  });

  return res.json(user);
});

export default handler;
