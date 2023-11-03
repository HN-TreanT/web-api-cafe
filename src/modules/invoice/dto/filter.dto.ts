import { ApiProperty } from "@nestjs/swagger";

export class FilterDto {
  @ApiProperty()
  id_employee: string;
  @ApiProperty()
  id_customer: string;
  @ApiProperty()
  id_promotion: string;
  @ApiProperty()
  name_customer: string;
  @ApiProperty()
  status: number;
  @ApiProperty()
  phone_number: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  id_table: string;
  @ApiProperty()
  time_start: Date;
  @ApiProperty()
  time_end: Date;
}
