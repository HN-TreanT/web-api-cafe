import { Sequelize } from "sequelize";

export const tranform_date: any[] = [
  [Sequelize.fn("date_format", Sequelize.col("createdAt"), "%Y-%m-%d %H:%i:%s"), "createdAt"],
  [Sequelize.fn("date_format", Sequelize.col("updatedAt"), "%Y-%m-%d %H:%i:%s"), "updatedAt"],
];
