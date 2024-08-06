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
import { Category } from "../category/category.entity";
import { UseMaterial } from "../use_material/use_material.entity";
import { DetailCombo } from "../detail_combo/detail_combo.entity";
import { InvoiceDetail } from "../invoice_detail/invoice_detail.entity";

@Table({ tableName: "product" })
export class Product extends Model<Product> {
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
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @AllowNull
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @AllowNull
  @Column({
    type: DataType.STRING(20),
  })
  unit: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id_category: number;

  @BelongsTo(() => Category)
  category: Category;
  @HasMany(() => UseMaterial)
  use_materials: UseMaterial[];
  @HasMany(() => DetailCombo)
  detail_combos: DetailCombo[];
  @HasMany(() => InvoiceDetail)
  invoice_details: InvoiceDetail[];
}
