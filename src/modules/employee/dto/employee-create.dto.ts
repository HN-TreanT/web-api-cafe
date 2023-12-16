import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { EmployeeWfCreate } from "src/modules/employee_workshift/dto/employee-workshift-create.dto";

export default class EmployeeCreate {
  // @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
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

  @ApiProperty({type: [Number]})
  employee_worshift: number[];
}
