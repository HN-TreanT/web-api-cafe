import { ApiProperty } from "@nestjs/swagger";

export class EmployeeWfCreate {
  @ApiProperty()
  id_workshift: number;

  @ApiProperty()
  id_employee: number;
}
