import { ApiProperty } from "@nestjs/swagger";

export class ProductFilter {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id_category: number;
}
