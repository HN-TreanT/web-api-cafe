import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class SupplierCreate {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
