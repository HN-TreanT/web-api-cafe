import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsEmail,
  PrimaryKey,
  Table,
  Unique,
  Model,
  BelongsTo,
} from "sequelize-typescript";
import { Employee } from "../employee/employee.entity";
import { Workshift } from "../workshift/workshift.entity";

@Table({ tableName: "employee_workshift" })
export class EmployeeWorkShift extends Model<EmployeeWorkShift> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => Workshift)
  @Column({
    type: DataType.BIGINT,
    onDelete: "CASCADE",
  })
  id_workshift: number;

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.BIGINT,
  })
  id_employee: number;

  @BelongsTo(() => Workshift)
  workshift: Workshift;

  @BelongsTo(() => Employee)
  employee: Employee;
}
