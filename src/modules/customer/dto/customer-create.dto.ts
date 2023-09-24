import { IsNotEmpty } from "class-validator";

export class CustomerCreate {
  @IsNotEmpty()
  name: string;
  gender: number;
  email: string;
  phone_number: string;
  point: number;
}
