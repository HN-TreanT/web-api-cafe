import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { EmployeeWfCreate } from "src/modules/employee_workshift/dto/employee-workshift-create.dto";

export default class EmployeeUpdate {
  // @IsEmail()
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  birthday: Date;
  
  @ApiProperty()
  address: string;

  @ApiProperty()
  gender: number;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  id_position: string;

  @ApiProperty()
  employee_worshift: EmployeeWfCreate[];
}
