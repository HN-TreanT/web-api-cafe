import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class TblInvoiceEdit {
  @ApiProperty()
  id_table: number;

  @ApiProperty()
  id_invoice: number;
}
