import { Module } from "@nestjs/common";
import { InvoiceService } from "./invoice.service";
import { invoiceProvider } from "./invoice.provider";
import { InvoiceController } from "./invoice.controller";

@Module({
  imports: [],
  controllers: [InvoiceController],
  providers: [InvoiceService, ...invoiceProvider],
  exports: [InvoiceService],
})
export class InvoiceModule {}
