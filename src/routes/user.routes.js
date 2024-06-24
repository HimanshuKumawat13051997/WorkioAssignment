import express from "express";
import { usersController } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

export const userRouter = express.Router();

userRouter.get("/worko/user", authenticate, usersController.AllUserDetails);
userRouter.get("/worko/user/:userId", authenticate, usersController.userSearch);
userRouter.post("/worko/user", usersController.createUser);
userRouter.put("/worko/user/:userId", authenticate, usersController.updateUser);
userRouter.patch(
  "/worko/user/:userId",
  authenticate,
  usersController.patchUser
);
userRouter.delete(
  "/worko/user/:userId",
  authenticate,
  usersController.deleteUser
);
