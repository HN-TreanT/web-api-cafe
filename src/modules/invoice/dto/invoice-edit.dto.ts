import { ApiProperty } from "@nestjs/swagger";
import { InvoiceDetailEdit } from "src/modules/invoice_detail/dto/invoice-detail-edit";

export class InoviceEdit {
  @ApiProperty()
  id_employee: number;
  @ApiProperty()
  id_customer: number;
  @ApiProperty()
  id_promotion: number;
  @ApiProperty()
  status: number;

  @ApiProperty()
  time_pay: Date;

  @ApiProperty()
  price: number;

  @ApiProperty({type : [InvoiceDetailEdit]})
  lst_invoice_detail: InvoiceDetailEdit[];

  @ApiProperty()
  id_tables: number[];
}
