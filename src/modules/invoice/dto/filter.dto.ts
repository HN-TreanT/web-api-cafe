import { ApiProperty } from "@nestjs/swagger";

export class FilterDto {
  @ApiProperty({required:false})
  id_employee: string;
  @ApiProperty({required:false})
  id_customer: string;
  @ApiProperty({required:false})
  id_promotion: string;
  @ApiProperty({required:false})
  name_customer: string;
  @ApiProperty({required:false, type: [Number]})
  status: number[];
  @ApiProperty({required:false})
  phone_number: string;
  @ApiProperty({required:false})
  email: string;
  @ApiProperty({required:false})
  id_table: string;
  @ApiProperty({required:false})
  time_start: Date;
  @ApiProperty({required:false})
  time_end: Date;
  @ApiProperty({required:false})
  thanh_toan: string;
}
