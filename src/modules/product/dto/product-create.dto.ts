import { IsNotEmpty, Length, MaxLength } from "class-validator";
import { UseMaterialEdit } from "src/modules/use_material/dto/use-material-edit.dto";

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

  lst_use_material: UseMaterialEdit[];
}
