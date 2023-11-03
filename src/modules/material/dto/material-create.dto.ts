import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class MaterialCreate {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  unit: string;

  @ApiProperty()
  expriation_date: Date;
}
