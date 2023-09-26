import { IsNotEmpty, Length, MaxLength } from "class-validator";

export class ProductEdit {
  name: string;
  description: string;
  image: string;
  price: number;
  unit: string;
  id_category: number;
}
