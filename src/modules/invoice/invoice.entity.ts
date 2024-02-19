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
import { Employee } from "../employee/employee.entity";
import { Customer } from "../customer/customer.entity";
import { Promotion } from "../promotion/promotion.entity";
import { InvoiceDetail } from "../invoice_detail/invoice_detail.entity";
import { TableFoodInvoice } from "../table_food_invoice/table_food_invoice.entity";

@Table({ tableName: "invoice" })
export class Invoice extends Model<Invoice> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => Employee)
  @AllowNull
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id_employee: number;

  @ForeignKey(() => Customer)
  @AllowNull
  @Column({
    type: DataType.BIGINT,
  })
  id_customer: number;

  @ForeignKey(() => Promotion)
  @AllowNull
  @Column({
    type: DataType.BIGINT,
  })
  id_promotion: number;

  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @AllowNull
  @Column({
    type: DataType.DATE,
    field: "time_pay",
  })
  time_pay: Date;

  @Default(0)
  @Column({
    type: DataType.INTEGER, //trang thai :
  })                        // 0 : chưa thanh toán, chưa hoàn thành ,1 : Dang dung bua ,2: Đơn hủy , 3: Hoan thanh
  status: number;

  @BelongsTo(() => Employee)
  employee: Employee;
  @BelongsTo(() => Customer)
  customer: Customer;
  @BelongsTo(() => Promotion)
  promotion: Promotion;

  @HasMany(() => InvoiceDetail)
  invoice_details: InvoiceDetail[];
  @HasMany(() => TableFoodInvoice)
  tablefood_invoices: TableFoodInvoice[];
}
