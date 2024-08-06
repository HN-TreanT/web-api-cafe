import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class DetailComboCreate {

  @ApiProperty()
  @IsNotEmpty()
  id_product: number;

  @ApiProperty()
  @IsNotEmpty()
  id_combo: number;

  @ApiProperty()
  check_bonus: boolean;
}
