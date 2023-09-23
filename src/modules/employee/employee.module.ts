import { Module } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { EmployeeController } from "./employee.controller";
import { employeeProviders } from "./employee.provider";
@Module({
  imports: [],
  controllers: [EmployeeController],
  providers: [EmployeeService, ...employeeProviders],
  exports: [EmployeeService],
})
export class EmployeeModule {}
