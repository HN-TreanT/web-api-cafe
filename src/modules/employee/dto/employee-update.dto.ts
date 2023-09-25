import { IsEmail } from "class-validator";
import { EmployeeWfCreate } from "src/modules/employee_workshift/dto/employee-workshift-create.dto";

export default class EmployeeUpdate {
  // @IsEmail()
  email: string;

  birthday: Date;

  address: string;

  gender: number;

  phone_number: string;

  id_position: string;

  employee_worshift: EmployeeWfCreate[];
}
