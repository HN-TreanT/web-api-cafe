import { ApiProperty } from "@nestjs/swagger";

export class PromotionFilter {
  @ApiProperty()
  name: string;
  @ApiProperty()
  condition: number;
}
