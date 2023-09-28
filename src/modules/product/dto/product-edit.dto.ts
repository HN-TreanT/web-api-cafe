import { IsNotEmpty, Length, MaxLength } from "class-validator";
import { UseMaterialEdit } from "src/modules/use_material/dto/use-material-edit.dto";

export class ProductEdit {
  name: string;
  description: string;
  image: string;
  price: number;
  unit: string;
  id_category: number;
  lst_use_material: UseMaterialEdit[];
}
