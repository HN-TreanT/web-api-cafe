import { ApiProperty } from "@nestjs/swagger";

export class TableFoodDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  status: number;
}
