import { ApiProperty } from "@nestjs/swagger";

export class ProductFilter {
  @ApiProperty({required:false})
  name: string;

  @ApiProperty({required:false})
  id_category: number;
}
