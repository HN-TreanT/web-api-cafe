import { Module } from "@nestjs/common";
import { DetailCheckInventorContronller } from "./detail-check-inventor.controller";
import { DtCheckInventorService } from "./detail-check-inventor.service";
import { CHECK_INVENTORY_REPOSITORY, DETAIL_CHECK_INVENTORY_REPOSITORY } from "src/constants/repository_enum";
import { DetailCheckInventory } from "./detail_check-inventory.entity";
import { CheckInventory } from "../check_inventory/check_inventory";

@Module({
  imports: [],
  controllers: [DetailCheckInventorContronller],
  providers: [
    DtCheckInventorService,
    {
      provide: DETAIL_CHECK_INVENTORY_REPOSITORY,
      useValue: DetailCheckInventory,
    },
    {
      provide: CHECK_INVENTORY_REPOSITORY,
      useValue: CheckInventory,
    },
  ],
  exports: [DtCheckInventorService],
})
export class DTCheckInventorModule {}
