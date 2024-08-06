import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsEmpty } from "class-validator";

export default class RegisterInfo {
  @ApiProperty({required:true})
  @IsNotEmpty()
  username: string;

  @ApiProperty({required:true})
  @IsNotEmpty()
  password: string;

  @ApiProperty({required:true})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({required:true})
  @IsNotEmpty()
  name: string;

  @ApiProperty({required:false})
  birthday: Date;

  @ApiProperty({required:false})
  address: string;

  @ApiProperty({required:false})
  gender: number;

  @ApiProperty({required:false})
  phone_number: string;

  @ApiProperty({required:false})
  id_position: string;
}
