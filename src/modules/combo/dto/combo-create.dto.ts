import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { DetailComboCreate } from "src/modules/detail_combo/dto/detailcobom-create.dto";
import { DetailComboEdit } from "src/modules/detail_combo/dto/detailcombo-edit.dto";

export class ComboCreate {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty({type: [DetailComboEdit]})
  id_products: DetailComboEdit[];
}
