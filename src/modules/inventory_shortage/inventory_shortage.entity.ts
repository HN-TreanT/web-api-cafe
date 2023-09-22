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
import { Material } from "../material/material.entity";

@Table({ tableName: "inventory_shortage" })
export class InventoryShortage extends Model<InventoryShortage> {
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
  })
  id_material: number;

  @Column({
    type: DataType.DATE,
  })
  time_check: Date;

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
}
