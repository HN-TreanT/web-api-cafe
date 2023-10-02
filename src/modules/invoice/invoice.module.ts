import { Module } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { invoiceProvider } from "./invoice.provider";
import { InvoiceController } from "./invoice.controller";
import { ProductModule } from "../product/product.module";

@Module({
  imports: [ProductModule],
  controllers: [InvoiceController],
  providers: [InvoiceService, ...invoiceProvider],
  exports: [InvoiceService],
})
export class InvoiceModule {}
