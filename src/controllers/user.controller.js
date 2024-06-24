import { nanoid } from "nanoid";
import { ServiceUser } from "../services/user.service.js";
import { updateUserSchema, userSchema } from "../validators/user.validator.js";

class userController {
  async createUser(req, res) {
    try {
      const { error } = userSchema.validate(req.body);

      if (error) return res.status(400).json(error.details[0].message);
      const userData = {
        ...req.body,
        Token: nanoid(),
      };
      const user = await ServiceUser.createuser(userData);
      console.log(user);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ Message: error.message });
    }
  }

  async userSearch(req, res) {
    try {
      const user = await ServiceUser.userSearch(req.params.userId);
      if (!user) return res.status(404).json("User not found");
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async AllUserDetails(req, res) {
    try {
      const users = await ServiceUser.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async updateUser(req, res) {
    try {
      const { error } = userSchema.validate(req.body);
      if (error) return res.status(400).json(error.details[0].message);
      const user = await ServiceUser.updateUser(req.params.userId, req.body);

      if (!user) return res.status(404).json("User not found");
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async patchUser(req, res) {
    try {
      const { error } = updateUserSchema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await ServiceUser.updateUser(req.params.userId, req.body);
      if (!user) return res.status(404).json("User not found");
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const result = await ServiceUser.deleteUser(req.params.userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

export const usersController = new userController();
