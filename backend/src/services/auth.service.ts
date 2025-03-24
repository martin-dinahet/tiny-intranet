import * as bcrypt from "bcryptjs";

import { AppDataSource } from "../data-source";
import { User } from "../entities/user";

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async (username: string, email: string, password: string) => {
  const user = new User();

  user.username = username;
  user.email = email;
  user.password = password;

  await userRepository.save(user);

  return user;
};

export const authenticateUser = async (email: string, password: string) => {
  const user = await userRepository.findOneBy({ email });
  if (!user) throw new Error("User not found");
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid password");
  return { user };
};
