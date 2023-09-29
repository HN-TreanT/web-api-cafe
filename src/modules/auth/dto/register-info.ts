import { IsNotEmpty, IsEmail, IsEmpty } from "class-validator";

export default class RegisterInfo {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  birthday: Date;

  address: string;

  gender: number;

  phone_number: string;

  id_position: string;
}
