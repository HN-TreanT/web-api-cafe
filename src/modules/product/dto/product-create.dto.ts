import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, MaxLength } from "class-validator";
import { UseMaterialEdit } from "src/modules/use_material/dto/use-material-edit.dto";

export class ProductCreate {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @MaxLength(20)
  unit: string;

  @ApiProperty()
  @IsNotEmpty()
  id_category: number;

  @ApiProperty({type: [UseMaterialEdit]})
  lst_use_material: UseMaterialEdit[];
}
