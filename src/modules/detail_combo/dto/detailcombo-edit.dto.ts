import { ApiProperty } from "@nestjs/swagger";

export class DetailComboEdit {
  @ApiProperty()
  id_product: number;

  @ApiProperty()
  id_combo: number;

  @ApiProperty()
  check_bonus: boolean;
}
