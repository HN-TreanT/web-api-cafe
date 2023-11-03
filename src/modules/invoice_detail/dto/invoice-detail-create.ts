import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class InvoiceDetailCreate {
  @ApiProperty()
  @IsNotEmpty()
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
