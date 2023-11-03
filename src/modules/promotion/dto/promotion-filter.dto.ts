import { ApiProperty } from "@nestjs/swagger";

export class PromotionFilter {
  @ApiProperty({required:false})
  name: string;
  @ApiProperty({required:false})
  condition: number;
}
