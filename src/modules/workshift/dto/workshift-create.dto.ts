import { ApiProperty } from "@nestjs/swagger";

export class WorkshiftCreate {
  @ApiProperty()
  arrival_time: Date;

  @ApiProperty()
  end_time: Date;
}
