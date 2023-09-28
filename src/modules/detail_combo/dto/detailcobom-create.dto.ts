import { IsNotEmpty } from "class-validator";

export class DetailComboCreate {
  @IsNotEmpty()
  id_product: number;
  @IsNotEmpty()
  id_combo: number;
  check_bonus: boolean;
}
