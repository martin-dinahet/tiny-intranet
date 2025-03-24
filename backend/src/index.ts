import "reflect-metadata";

import express from "express";
import authRoutes from "./routes/auth-routes";

import { AppDataSource } from "./data-source";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
