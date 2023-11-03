import { ApiProperty } from "@nestjs/swagger";

export class InvoiceDetailEdit {
  @ApiProperty()
  id_invoice: number;

  @ApiProperty()
  id_product: number;

  @ApiProperty()
  id_combo: number;

  @ApiProperty()
  isCombo: boolean;

  @ApiProperty()
  price: number;

  @ApiProperty()
  amount: number;
}
