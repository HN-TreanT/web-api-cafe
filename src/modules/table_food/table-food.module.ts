import { Module } from "@nestjs/common";
import { TableFoodService } from "./table-food.service";
import { provider } from "./table_food.provider";
import { TableController } from "./table-food.controller";
import { TablefoodInvoiceModule } from "../table_food_invoice/tablefood-invoice.module";

@Module({
  imports: [TablefoodInvoiceModule],
  providers: [TableFoodService, ...provider],
  controllers: [TableController],
  exports: [TableFoodService],
})
export class TableModule {}
