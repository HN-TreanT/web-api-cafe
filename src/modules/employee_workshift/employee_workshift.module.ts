import { Module } from "@nestjs/common";
import { EmployeeWorkShiftController } from "./employee_workshift.controller";
import { EmployeeWorkShiftService } from "./employee_workshift.service";
import { providers } from "./employee_workshift.provider";

@Module({
  imports: [],
  controllers: [EmployeeWorkShiftController],
  providers: [EmployeeWorkShiftService, ...providers],
  exports: [EmployeeWorkShiftService],
})
export class EmployeeWorkShiftModule {}
