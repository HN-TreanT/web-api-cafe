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
import { DetailShipment } from "../detail_shipment/detail_shipment.enitty";
import { Supplier } from "../supplier/supplier.entity";
import { Employee } from "../employee/employee.entity";

@Table({ tableName: "shipment" })
export class Shipment extends Model<Shipment> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => Supplier)
  @AllowNull
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id_supplier: number;

  @ForeignKey(() => Employee)
  @AllowNull
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id_employee: number;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @HasMany(() => DetailShipment)
  detail_shipments: DetailShipment[];

  @BelongsTo(() => Supplier)
  supplier: Supplier;

  @BelongsTo(() => Employee)
  employee: Employee;
}
