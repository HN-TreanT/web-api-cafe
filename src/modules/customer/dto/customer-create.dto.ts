import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CustomerCreate {

  @ApiProperty()
  @IsNotEmpty()
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
