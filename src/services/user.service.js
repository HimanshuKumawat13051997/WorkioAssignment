import { UserDAO } from "../dao/user.dao.js";
import { UserDTO } from "../dtos/user.dto.js";

class UserService {
  async createuser(userData) {
    const user = await UserDAO.create(userData);
    return new UserDTO(user);
  }

  async userSearch(userId) {
    const user = await UserDAO.findSingle(userId);
    return new UserDTO(user);
  }

  async getAllUsers() {
    const users = await UserDAO.findallusers();
    return users.map((user) => new UserDTO(user));
  }

  async updateUser(userId, userData) {
    const user = await UserDAO.updateuser(userId, userData);
    return new UserDTO(user);
  }

  async deleteUser(userId) {
    await UserDAO.delete(userId);
    return { message: "User successfully deleted" };
  }
}

export const ServiceUser = new UserService();
