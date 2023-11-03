import { ApiProperty } from "@nestjs/swagger";

export class DtInvoiceFilter {
  @ApiProperty()
  id_invoice: number;
}
