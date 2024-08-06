import { ApiProperty } from "@nestjs/swagger";

export class MaterialEdit {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  unit: string;

  expriation_date: Date;
}
