import { ApiProperty } from "@nestjs/swagger";
import { DTCheckInventoryEdit } from "src/modules/detail-check-inventory/dto/dt-check-inventory-edit";

export class CheckInventoryDto {
  @ApiProperty()
  time_check: Date;

  @ApiProperty()
  lst_dt_check: DTCheckInventoryEdit[];
}
