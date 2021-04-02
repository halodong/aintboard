import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export default async function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  let bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const JwtDecoded = jwt_decode(bearerToken);

    // verifies secret and checks exp
    jwt.verify(bearerToken, process.env.TOKEN_SECRET, async function (err) {
      let jwtToken = "";

      if (err) {
        // check if expired
        if (err?.name === "TokenExpiredError") {
          //JWT Payload
          const payload = {
            id: JwtDecoded.userId,
          };

          // Sign token
          jwtToken = await jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY,
          });

          // if everything is good, save to request for use in other routes
          req.userId = JwtDecoded.id;
          req.jwtToken = jwtToken;
          return next();
        }

        return res
          .status(500)
          .send({
            auth: false,
            message: "Failed to authenticate token.",
            error: err,
          });
      }

      // if everything is good, save to request for use in other routes
      req.userId = JwtDecoded.id;
      req.jwtToken = jwtToken;
      next();
    });
  } else {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }
}
