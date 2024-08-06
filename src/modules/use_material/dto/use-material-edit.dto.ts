import { ApiProperty } from "@nestjs/swagger";

export class UseMaterialEdit {
  @ApiProperty()
  id_product: number;

  @ApiProperty()
  id_material: number;

  @ApiProperty()
  amount: number;
}
