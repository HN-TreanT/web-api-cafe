import { IsNotEmpty, IsEmail, IsEmpty } from "class-validator";

export default class RegisterInfo {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEmpty()
  birthday: Date;

  @IsEmpty()
  address: string;

  @IsEmpty()
  gender: number;

  @IsEmpty()
  phone_number: string;

  @IsEmpty()
  id_position: string;
}
