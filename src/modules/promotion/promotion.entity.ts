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

@Table({ tableName: "promotion" })
export class Promotion extends Model<Promotion> {
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

  @AllowNull
  @Column({ type: DataType.BIGINT })
  id_product: number;

  @Column({ type: DataType.FLOAT })
  condition: number;

  @AllowNull
  @Column({ type: DataType.FLOAT })
  discount: number;

  @HasMany(() => Invoice)
  invoices: Invoice[];
}
