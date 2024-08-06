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
import { DetailCheckInventory } from "../detail-check-inventory/detail_check-inventory.entity";
import { DetailShipment } from "../detail_shipment/detail_shipment.enitty";
import { UseMaterial } from "../use_material/use_material.entity";

@Table({ tableName: "material" })
export class Material extends Model<Material> {
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

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  amount: number;

  @AllowNull
  @Column({
    type: DataType.STRING(20),
  })
  unit: string;

  @AllowNull
  @Column({
    type: DataType.DATE,
    field: "expriation_date",
  })
  expriation_date: Date;

  @HasMany(() => DetailCheckInventory)
  detail_check_inventories: DetailCheckInventory[];
  @HasMany(() => DetailShipment)
  detail_shipments: DetailShipment[];
  @HasMany(() => UseMaterial)
  use_materials: UseMaterial[];
}
