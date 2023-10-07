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
    dialectOptions: {
      // useUTC: false, // for reading from database
      dateStrings: true,
      typeCast(field: any, next: any) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,

    dialectOptions: {
      // useUTC: false, // for reading from database
      dateStrings: true,
      typeCast(field: any, next: any) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
  },
  production: {
    // username: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME_PRODUCTION,
    // host: process.env.DB_HOST,
    // dialect: process.env.DB_DIALECT,
    // username: "ul71ctbbceafevp7",
    // password: "jSEcatyfs2hr4kowjCdY",
    // database: "bemnn0vlkcwd9rou1es9",
    // host: "bemnn0vlkcwd9rou1es9-mysql.services.clever-cloud.com",
    // port: 3306,
    // dialect: "mysql",

    //mysql railway

    username: "root",
    password: "7yYRHlkPO6m8K648v0Ut",
    database: "railway",
    host: "containers-us-west-171.railway.app",
    port: 7930,
    dialect: "mysql",

    dialectOptions: {
      // useUTC: false, // for reading from database
      dateStrings: true,
      typeCast(field: any, next: any) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      },
    },
  },
};
