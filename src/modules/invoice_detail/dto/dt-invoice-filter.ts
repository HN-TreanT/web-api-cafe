import { ApiProperty } from "@nestjs/swagger";

export class DtInvoiceFilter {
  @ApiProperty({required:false})
  id_invoice: number;
}
