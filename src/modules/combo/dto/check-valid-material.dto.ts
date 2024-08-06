import { ApiProperty } from "@nestjs/swagger";

export class CheckValidMaterial {
  @ApiProperty({required:true})
  id_combo: number;
  @ApiProperty({required:true})
  amount: number;
}
