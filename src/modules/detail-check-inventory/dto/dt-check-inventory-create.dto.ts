import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty } from "class-validator";

export class DTCheckInventoryCreate {
  @ApiProperty()
  @IsNotEmpty()
  id_material: number;
  @ApiProperty()
  @IsNotEmpty()
  id_detail_check: number;
  @ApiProperty()
  @IsEmpty()
  total_count: number;
}
