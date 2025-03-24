import "reflect-metadata";

import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Post } from "./entities/post";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Post],
  migrations: [],
  subscribers: [],
});
