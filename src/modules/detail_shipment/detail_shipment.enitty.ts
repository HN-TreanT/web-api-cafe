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
import { Shipment } from "../shipment/shipment.entity";
import { Material } from "../material/material.entity";

@Table({ tableName: "detail_shipment" })
export class DetailShipment extends Model<DetailShipment> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => Shipment)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: "id_shipment",
  })
  id_shipment: number;

  @ForeignKey(() => Material)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: "id_material",
  })
  id_material: number;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  amount: number;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @AllowNull
  @Column({
    type: DataType.DATE,
  })
  expiration_date: Date;

  @BelongsTo(() => Material)
  material: Material;
  @BelongsTo(() => Shipment)
  shipment: Shipment;
}
