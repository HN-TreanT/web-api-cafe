import { ApiProperty } from "@nestjs/swagger";
import { DetailComboEdit } from "src/modules/detail_combo/dto/detailcombo-edit.dto";

export class ComboEdit {

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty({type: [DetailComboEdit]})
  id_products: DetailComboEdit[];
}
