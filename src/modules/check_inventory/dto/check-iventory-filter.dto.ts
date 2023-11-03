import { ApiProperty } from "@nestjs/swagger";

export class CheckInventoryFilter {
  @ApiProperty({required:false})
  time_start: Date;

  @ApiProperty({required:false})
  time_end: Date;
}
