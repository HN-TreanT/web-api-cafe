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
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id_supplier: number;

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id_employee: number;

  @HasMany(() => DetailShipment)
  detail_shipments: DetailShipment[];

  @BelongsTo(() => Supplier)
  supplier: Supplier;

  @BelongsTo(() => Employee)
  employee: Employee;
}
