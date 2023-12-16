import { ApiProperty } from "@nestjs/swagger";

export class CombineInvoice {
  @ApiProperty()
  id_invoice_new: number;
  @ApiProperty()
  id_invoice_old: number;
  @ApiProperty({default: true})
  isCombineTable: boolean
}
