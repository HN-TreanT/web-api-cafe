import { IsNotEmpty, Length, MaxLength } from "class-validator";

export class ProductCreate {
  @IsNotEmpty()
  name: string;

  description: string;
  image: string;

  @IsNotEmpty()
  price: number;
  @MaxLength(20)
  unit: string;
  @IsNotEmpty()
  id_category: number;
}
