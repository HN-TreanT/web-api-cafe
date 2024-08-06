import { ApiProperty } from "@nestjs/swagger";

export class PromotionEdit {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id_product: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  condition: number;
}
