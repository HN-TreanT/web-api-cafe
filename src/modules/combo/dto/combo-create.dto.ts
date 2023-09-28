import { IsNotEmpty } from "class-validator";
import { DetailComboCreate } from "src/modules/detail_combo/dto/detailcobom-create.dto";
import { DetailComboEdit } from "src/modules/detail_combo/dto/detailcombo-edit.dto";

export class ComboCreate {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  price: number;

  id_products: DetailComboEdit[];
}
