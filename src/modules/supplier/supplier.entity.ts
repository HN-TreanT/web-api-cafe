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

@Table({ tableName: "supplier" })
export class Supplier extends Model<Supplier> {
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
  address: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "phone_number",
  })
  phone_number: string;

  @IsEmail
  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;
}
