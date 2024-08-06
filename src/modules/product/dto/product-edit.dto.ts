import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, MaxLength } from "class-validator";
import { UseMaterialEdit } from "src/modules/use_material/dto/use-material-edit.dto";

export class ProductEdit {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  unit: string;

  @ApiProperty()
  id_category: number;

  @ApiProperty({type : [UseMaterialEdit]})
  lst_use_material: UseMaterialEdit[];
}
