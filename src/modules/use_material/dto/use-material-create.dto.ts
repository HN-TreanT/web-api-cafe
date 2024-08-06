import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UseMaterialCreate {
  @ApiProperty()
  @IsNotEmpty()
  id_product: number;

  @ApiProperty()
  @IsNotEmpty()
  id_material: number;

  @ApiProperty()
  @IsNotEmpty()
  amount: number;
}
