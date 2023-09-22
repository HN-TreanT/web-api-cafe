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
import { Invoice } from "../invoice/invoice.entity";

@Table({ tableName: "customer" })
export class Customer extends Model<Customer> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Default(1)
  @Column({
    type: DataType.TINYINT,
  })
  gender: number;

  @AllowNull
  @IsEmail
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @AllowNull
  @Column({
    type: DataType.STRING,
    field: "phone_number",
  })
  phone_number: string;

  @Default(0)
  @Column({
    type: DataType.BIGINT,
  })
  point: number;

  @HasMany(() => Invoice)
  invoices: Invoice[];
}
