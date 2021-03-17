import { isMatch } from "lodash";
import nc from "next-connect";

import { all } from "~/middlewares/index";

const handler = nc();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

handler.use(all);

handler.post(async (req, res) => {
  const { email, password } = req.body;

  const user = await req.db.collection("users").findOne({ email: email });
  if (!user) return res.status(400).json({ error: "Email is wrong" });

  if (user) {
    const userId = user._id,
      userEmail = user.email,
      userPassword = user.password;

    const compare = await bcrypt.compare(password, userPassword);
    if (compare && isMatch) {
      //JWT Payload
      const payload = {
        id: userId,
        email: userEmail,
      };
      // Sign token
      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {
          expiresIn: 31556926, // 1 year in seconds
        },
        (err, token) => {
          res.status(200).json({
            success: true,
            token: "Bearer " + token,
            data: {
              message: "Login Successful",
            },
          });
        }
      );
    } else {
      res.status(400).json({ status: "error", error: "Password incorrect" });
    }
  }
});

export default handler;
