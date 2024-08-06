import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty } from "class-validator";

export class PromotionCreate {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  id_product: number;
  @ApiProperty()
  discount: number;
  @ApiProperty()
  condition: number;
}
