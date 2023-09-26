import { IsNotEmpty } from "class-validator";

export class ComboCreate {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  price: number;
}
