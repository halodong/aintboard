import nc from "next-connect";

import { all } from "~/middlewares/index";

/*
 * TODO
 * 1. Verify Token
 */

const handler = nc();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

handler.use(all);

handler.post(async (req, res) => {
  const { email, password } = req.body;

  const user = await req.db.collections("users").findOne({ email: email }); //returns collections(...).findOne is not a function for some reason
  if (!user) return res.status(400).json({ error: "Email is wrong" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Password is wrong" });

  const token = jwt.sign(
    {
      name: user.userName,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).json({
    error: null,
    data: {
      token,
    },
  });

  return res.json({
    error: null,
    data: {
      message: "Login successful",
    },
  });
});
export default handler;
