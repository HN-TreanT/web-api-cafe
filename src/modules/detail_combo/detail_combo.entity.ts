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
import { Combo } from "../combo/combo.entity";

@Table({ tableName: "detail_combo" })
export class DetailCombo extends Model<DetailCombo> {
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

  @ForeignKey(() => Combo)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: "id_combo",
    onDelete: "CASCADE",
  })
  id_combo: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  check_bonus: boolean;

  @BelongsTo(() => Product)
  product: Product;
  @BelongsTo(() => Combo)
  combo: Combo;
}
