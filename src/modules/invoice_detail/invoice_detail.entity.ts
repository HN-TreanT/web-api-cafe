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
import { Product } from "../product/product.entity";
import { Combo } from "../combo/combo.entity";

@Table({ tableName: "invoice_detail" })
export class InvoiceDetail extends Model<InvoiceDetail> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => Invoice)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id_invoice: number;

  @AllowNull
  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
  })
  id_product: number;

  @AllowNull
  @ForeignKey(() => Combo)
  @Column({
    type: DataType.BIGINT,
  })
  id_combo: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isCombo: boolean;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @Default(1)
  @Column({ type: DataType.INTEGER })
  amount: number;

  @BelongsTo(() => Invoice)
  invoice: Invoice;
  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Combo)
  combo: Combo;
}
