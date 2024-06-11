import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class searcgImageDTO {
  @ApiProperty({required:true})
  @IsNotEmpty()
  config_param: string;
}
