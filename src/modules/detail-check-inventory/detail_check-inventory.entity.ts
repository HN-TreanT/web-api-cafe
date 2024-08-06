import { AutoIncrement, Column, DataType, PrimaryKey, Table, Model, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Material } from "../material/material.entity";
import { CheckInventory } from "../check_inventory/check_inventory";
@Table({ tableName: "detail_check_inventory" })
export class DetailCheckInventory extends Model<DetailCheckInventory> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => Material)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: "CASCADE",
  })
  id_material: number;

  @ForeignKey(() => CheckInventory)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: "CASCADE",
  })
  id_detail_check: number;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  total_count: number;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  actual_count: number;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  shortage_count: number;
  @BelongsTo(() => Material)
  material: Material;
  @BelongsTo(() => CheckInventory)
  check_inventory: CheckInventory;
}
