import { EMPLOYEE_REPOSITORY } from "src/constants/repository_enum";
import { Employee } from "../employee/employee.entity";

export const employeeProviders = [{ provide: EMPLOYEE_REPOSITORY, useValue: Employee }];
