import { user } from "../models/user.model.js";

async function authenticate(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.sendStatus(401);

  try {
    const find = user.find({ Token: token });
    if (find) {
      req.user = user;
      next();
    } else {
      res.status(401).send({ message: "Invalid token" });
    }
  } catch (error) {
    res.sendStatus(403);
  }
}

export { authenticate };
