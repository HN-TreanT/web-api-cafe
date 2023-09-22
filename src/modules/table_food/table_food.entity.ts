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
import { TableFoodInvoice } from "../table_food_invoice/table_food_invoice.entity";

@Table({ tableName: "table_food" })
export class TableFood extends Model<TableFood> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({ type: DataType.STRING(20), allowNull: false })
  name: string;

  @Default(0)
  @Column({ type: DataType.INTEGER })
  status: number;

  @HasMany(() => TableFoodInvoice)
  tablefood_invoices: TableFoodInvoice[];
}
