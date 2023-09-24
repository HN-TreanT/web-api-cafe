import { IsEmpty, IsNotEmpty } from "class-validator";

export class PromotionCreate {
  @IsNotEmpty()
  name: string;
  id_product: number;
  discount: number;
  condition: number;
}
