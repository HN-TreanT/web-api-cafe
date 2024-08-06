import { Module } from "@nestjs/common";
import { CheckInventoryService } from "./check_inventory.service";
import { CHECK_INVENTORY_REPOSITORY, DETAIL_CHECK_INVENTORY_REPOSITORY, MATERIAL_REPOSITORY } from "src/constants/repository_enum";
import { CheckInventory } from "./check_inventory";
import { CheckInventoryController } from "./check_inventory.controller";
import { DetailCheckInventory } from "../detail-check-inventory/detail_check-inventory.entity";
import { Material } from "../material/material.entity";

@Module({
  imports: [],
  providers: [
    CheckInventoryService,
    {
      provide: CHECK_INVENTORY_REPOSITORY,
      useValue: CheckInventory,
    },
    {
      provide: DETAIL_CHECK_INVENTORY_REPOSITORY,
      useValue: DetailCheckInventory,
    },
    {
      provide: MATERIAL_REPOSITORY,
      useValue: Material,
    },
  ],
  controllers: [CheckInventoryController],
  exports: [CheckInventoryService],
})
export class CheckInventoryModule {}
