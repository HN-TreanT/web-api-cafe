import { ApiProperty } from "@nestjs/swagger";

export class EmployeeFilter {
  
  @ApiProperty({required:false})
  search: string;
  @ApiProperty({required:false})
  id_position: number;
}
