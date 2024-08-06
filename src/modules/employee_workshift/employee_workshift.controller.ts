import { Controller } from "@nestjs/common";
import { EmployeeWorkShiftService } from "./employee_workshift.service";

@Controller("employee-workshift")
export class EmployeeWorkShiftController {
  constructor(private readonly _service: EmployeeWorkShiftService) {}
}
