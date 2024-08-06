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
import { TableFood } from "../table_food/table_food.entity";
import { Invoice } from "../invoice/invoice.entity";

@Table({ tableName: "table_food_invoice" })
export class TableFoodInvoice extends Model<TableFoodInvoice> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => TableFood)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id_table: number;

  @ForeignKey(() => Invoice)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id_invoice: number;

  @BelongsTo(() => TableFood)
  table_food: TableFood;
  @BelongsTo(() => Invoice)
  invoice: Invoice;
}
