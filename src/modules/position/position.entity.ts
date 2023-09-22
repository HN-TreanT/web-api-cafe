import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  IsEmail,
  PrimaryKey,
  Table,
  Unique,
  Model,
  HasMany,
} from "sequelize-typescript";
import { Employee } from "../employee/employee.entity";

@Table({ tableName: "position" })
export class Position extends Model<Position> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(10),
  })
  id: string;

  @Unique
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @HasMany(() => Employee)
  employees: Employee[];
}
