import { Module } from "@nestjs/common";
import { inoviceDetailProvider } from "./invooice-detail.provider";
import { InvoiceDetailService } from "./invoice-detail.service";
import { InvoiceDetailController } from "./invoice-detail.controller";

@Module({
  imports: [],
  controllers: [InvoiceDetailController],
  providers: [...inoviceDetailProvider, InvoiceDetailService],
  exports: [InvoiceDetailService],
})
export class InvoiceDetailModule {}
