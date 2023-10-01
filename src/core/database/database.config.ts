import * as dotenv from "dotenv";

import { IDatabaseConfig } from "./interfaces/dbConfig.interface";

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEVELOPMENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    // username: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME_PRODUCTION,
    // host: process.env.DB_HOST,
    // dialect: process.env.DB_DIALECT,
    username: "ul71ctbbceafevp7",
    password: "jSEcatyfs2hr4kowjCdY",
    database: "bemnn0vlkcwd9rou1es9",
    host: "bemnn0vlkcwd9rou1es9-mysql.services.clever-cloud.com",
    port: 3306,
    dialect: "mysql",
  },
};
