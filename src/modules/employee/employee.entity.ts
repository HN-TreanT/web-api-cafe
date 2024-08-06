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
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { EmployeeWorkShift } from "../employee_workshift/employee_workshift.entity";
import { Position } from "../position/position.entity";
import { Invoice } from "../invoice/invoice.entity";
import { Shipment } from "../shipment/shipment.entity";
import { Exclude } from "class-transformer";

@Table({ tableName: "employee" })
export class Employee extends Model<Employee> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Unique
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  username: string;

  @Exclude()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Unique
  @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @AllowNull
  @Column({ type: DataType.DATE })
  birthday: Date;

  @AllowNull
  @Column({ type: DataType.STRING })
  address: string;

  @Default(1)
  @Column({ type: DataType.TINYINT })
  gender: number;

  @AllowNull
  @Column({ type: DataType.STRING, field: "phone_number" })
  phone_number: string;

  @ForeignKey(() => Position)
  @Column({ type: DataType.STRING(10), allowNull: false })
  id_position: string;

  @AllowNull
  @Column({ type: DataType.STRING })
  refresh_token: string;

  @HasMany(() => EmployeeWorkShift)
  employee_workshifts: EmployeeWorkShift[];

  @BelongsTo(() => Position)
  position: Position;

  @HasMany(() => Invoice)
  invoices: Invoice[];

  @HasMany(() => Shipment)
  shipments: Shipment[];
}
