import { IsEmpty, IsNotEmpty } from "class-validator";

export class DTCheckInventoryCreate {
  @IsNotEmpty()
  id_material: number;
  @IsNotEmpty()
  id_detail_check: number;
  @IsEmpty()
  total_count: number;
}
