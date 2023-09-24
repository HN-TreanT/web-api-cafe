import { IsNotEmpty } from "class-validator";

export class CustomerEdit {
  name: string;
  gender: number;
  email: string;
  phone_number: string;
  point: number;
}
