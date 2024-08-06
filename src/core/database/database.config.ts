import * as dotenv from "dotenv";

import { IDatabaseConfig } from "./interfaces/dbConfig.interface";

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
   development: {
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASS,
  //   database: process.env.DB_NAME_DEVELOPMENT,
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  //   dialect: process.env.DB_DIALECT,
    username: "root",
    password: "hnam23012002",
    database: "cafe",
    host: "159.223.46.113",
    port: 3307,
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
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST,
    dialect: "mysql",
    // username: "ul71ctbbceafevp7",
    // password: "jSEcatyfs2hr4kowjCdY",
    // database: "bemnn0vlkcwd9rou1es9",
    // host: "bemnn0vlkcwd9rou1es9-mysql.services.clever-cloud.com",
    // port: 3306,
    // dialect: "mysql",

    //mysql railway

    // username: "ul71ctbbceafevp7",
    // password: "jSEcatyfs2hr4kowjCdY",
    // database: "bemnn0vlkcwd9rou1es9",
    // host: "bemnn0vlkcwd9rou1es9-mysql.services.clever-cloud.com",
    // port: 3306,
    // dialect: "mysql",

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
