import { ApiProperty } from "@nestjs/swagger";

export class EmployeeFilter {
  @ApiProperty()
  search: string;
  @ApiProperty()
  id_position: number;
}
