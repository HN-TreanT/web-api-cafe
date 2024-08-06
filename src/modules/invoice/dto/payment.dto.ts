import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class Payment {
  @ApiProperty()
  price_current: number;
}
