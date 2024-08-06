import { Module } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { invoiceProvider } from "./invoice.provider";
import { InvoiceController } from "./invoice.controller";
import { ProductModule } from "../product/product.module";
import { TablefoodInvoiceModule } from "../table_food_invoice/tablefood-invoice.module";
import { ShipmentModule } from "../shipment/shipment.module";

@Module({
  imports: [ProductModule, TablefoodInvoiceModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, ...invoiceProvider],
  exports: [InvoiceService],
})
export class InvoiceModule {}
