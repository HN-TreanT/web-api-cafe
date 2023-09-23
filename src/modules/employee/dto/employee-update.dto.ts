import { IsEmpty, IsEmail } from "class-validator";

export default class EmployeeUpdate {
  @IsEmpty()
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
