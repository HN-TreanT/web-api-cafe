import { ApiProperty } from "@nestjs/swagger";

export class CheckValidMaterial {
  @ApiProperty()
  id_combo: number;
  @ApiProperty()
  amount: number;
}
