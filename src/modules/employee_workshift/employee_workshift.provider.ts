import { EMPLOYEE_WORKSHIFT_REPOSITORY } from "src/constants/repository_enum";
import { EmployeeWorkShift } from "./employee_workshift.entity";

export const providers = [{ provide: EMPLOYEE_WORKSHIFT_REPOSITORY, useValue: EmployeeWorkShift }];
