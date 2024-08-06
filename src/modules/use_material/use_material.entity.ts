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
import { Product } from "../product/product.entity";
import { Material } from "../material/material.entity";

@Table({ tableName: "use_material" })
export class UseMaterial extends Model<UseMaterial> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: "id_product",
    onDelete: "CASCADE",
  })
  id_product: number;

  @ForeignKey(() => Material)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: "id_material",
    onDelete: "CASCADE",
  })
  id_material: number;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  amount: number;

  @BelongsTo(() => Product)
  product: Product;
  @BelongsTo(() => Material)
  material: Material;
}
