import { IsNotEmpty, IsEmail } from "class-validator";

export class SupplierCreate {
  @IsNotEmpty()
  name: string;
  address: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
