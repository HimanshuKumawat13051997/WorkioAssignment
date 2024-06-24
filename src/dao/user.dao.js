import { user } from "../models/user.model.js";

class UserDAOs {
  async create(userdetails) {
    const newuser = new user(userdetails);
    return await newuser.save();
  }

  async findSingle(userId) {
    return await user
      .findById(userId)
      .where({ isDeleted: false })
      .select("-Token");
  }

  async findallusers() {
    return await user.find({ isDeleted: false }).select("-Token");
  }

  async updateuser(userId, userdetails) {
    return await user
      .findByIdAndUpdate(userId, userdetails, { new: true })
      .where({ isDeleted: false });
  }

  async delete(userId) {
    return await user.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );
  }
}

export const UserDAO = new UserDAOs();
