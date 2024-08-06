import { Module } from "@nestjs/common";
import { SupplierController } from "./supplier.controller";
import { SupplierSerivce } from "./supplier.service";
import { supplierProvider } from "./supllier.provider";

@Module({
  imports: [],
  controllers: [SupplierController],
  providers: [SupplierSerivce, ...supplierProvider],
  exports: [SupplierSerivce],
})
export class SupplierModule {}
