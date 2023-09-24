import { EMPLOYEE_REPOSITORY, EMPLOYEE_WORKSHIFT_REPOSITORY } from "src/constants/repository_enum";
import { Employee } from "../employee/employee.entity";
import { EmployeeWorkShift } from "../employee_workshift/employee_workshift.entity";

export const employeeProviders = [{ provide: EMPLOYEE_REPOSITORY, useValue: Employee }];
