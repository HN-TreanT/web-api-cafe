import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CustomerEdit {
  @ApiProperty()
  name: string;
  @ApiProperty()
  gender: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone_number: string;
  @ApiProperty()
  point: number;
}
