import { Exclude } from "class-transformer";
import { IsNotEmpty, IsEmail, IsEmpty } from "class-validator";

export default class EmployeeReponse {
  username: string;
  @Exclude()
  password: string;
  name: string;
  email: string;
  birthday: Date;
  address: string;
  gender: number;
  phone_number: string;
  id_position: string;
  refresh_token: string;
}
