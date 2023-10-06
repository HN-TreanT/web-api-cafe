import { DTCheckInventoryEdit } from "src/modules/detail-check-inventory/dto/dt-check-inventory-edit";

export class CheckInventoryDto {
  time_check: Date;

  lst_dt_check: DTCheckInventoryEdit[];
}
