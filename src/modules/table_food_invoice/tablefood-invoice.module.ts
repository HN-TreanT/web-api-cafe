import { Module } from "@nestjs/common";
import { TablefoodInoviceController } from "./tablefood-invoice.controller";
import { TablefoodInoviceService } from "./tablefood-invoice.service";
import { provider } from "./tablefood-invoice.provider";

@Module({
  imports: [],
  controllers: [TablefoodInoviceController],
  providers: [TablefoodInoviceService, ...provider],
  exports: [TablefoodInoviceService],
})
export class TablefoodInvoiceModule {}
