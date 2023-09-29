import { AutoIncrement, Column, DataType, Default, IsEmail, PrimaryKey, Table, Unique, Model, HasMany } from "sequelize-typescript";

import { DetailCheckInventory } from "../detail-check-inventory/detail_check-inventory.entity";
import { Expose, Transform } from "class-transformer";
import { format } from "date-fns";

@Table({ tableName: "check_inventory" })
export class CheckInventory extends Model<CheckInventory> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    type: DataType.DATE,
  })
  time_check: Date;

  @HasMany(() => DetailCheckInventory)
  detail_check_inventories: DetailCheckInventory[];
}
