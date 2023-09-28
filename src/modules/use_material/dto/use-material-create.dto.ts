import { IsNotEmpty } from "class-validator";

export class UseMaterialCreate {
  @IsNotEmpty()
  id_product: number;
  @IsNotEmpty()
  id_material: number;
  @IsNotEmpty()
  amount: number;
}
