import { Module } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { EmployeeController } from "./employee.controller";
import { employeeProviders } from "./employee.provider";
import { EmployeeWorkShiftModule } from "../employee_workshift/employee_workshift.module";
@Module({
  imports: [EmployeeWorkShiftModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, ...employeeProviders],
  exports: [EmployeeService],
})
export class EmployeeModule {}
