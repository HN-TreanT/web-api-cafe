import { Module } from "@nestjs/common";
import { WorkshiftServices } from "./workshift.service";
import { WorkshiftController } from "./workshift.controller";
import { workshiftProviders } from "./workshift.provider";
import { EmployeeWorkShiftModule } from "../employee_workshift/employee_workshift.module";

@Module({
  imports: [EmployeeWorkShiftModule],
  controllers: [WorkshiftController],
  providers: [WorkshiftServices, ...workshiftProviders],
  exports: [WorkshiftServices],
})
export class WorkshiftModule {}
