import { AllowNull, AutoIncrement, Column, DataType, Default, IsEmail, PrimaryKey, Table, Unique, Model, HasMany } from "sequelize-typescript";
import { EmployeeWorkShift } from "../employee_workshift/employee_workshift.entity";

@Table({ tableName: "workshift" })
export class Workshift extends Model<Workshift> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.TIME,
    field: "arrival_time",
  })
  arrival_time: Date;

  @Column({
    type: DataType.TIME,
    field: "end_time",
  })
  end_time: Date;

  @HasMany(() => EmployeeWorkShift)
  employee_workshift: EmployeeWorkShift[];
}
