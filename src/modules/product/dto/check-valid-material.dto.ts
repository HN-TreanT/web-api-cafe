import { ApiProperty } from "@nestjs/swagger";

export class CheckValidMaterail {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  id_product: number;
}
