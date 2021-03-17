import nc from "next-connect";

import { insertUser } from "~/db/user";
import { all } from "~/middlewares/index";

const handler = nc();
const bcrypt = require("bcrypt");

handler.use(all);

handler.post(async (req, res) => {
  const { firstName, lastName, email } = req.body;

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = await insertUser(req.db, {
    firstName,
    lastName,
    email,
    password,
  });

  return res.json({ user });
});

export default handler;
