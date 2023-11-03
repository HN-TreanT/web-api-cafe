import { ApiProperty } from "@nestjs/swagger";

export class CheckInventoryFilter {
  @ApiProperty()
  time_start: Date;

  @ApiProperty()
  time_end: Date;
}
