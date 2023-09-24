import { Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { customerProviders } from "./customer.provider";

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService, ...customerProviders],
})
export class CustomerModule {}
