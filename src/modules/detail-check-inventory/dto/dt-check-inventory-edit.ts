import { ApiProperty } from "@nestjs/swagger";

export class DTCheckInventoryEdit {
  @ApiProperty()
  id_material: number;
  @ApiProperty()
  id_detail_check: number;
  @ApiProperty()
  total_count: number;
  @ApiProperty()
  actual_count: number;
  @ApiProperty()
  shortage_count: number;
}
