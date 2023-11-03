import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class InfoChangePassword {
  @ApiProperty({required:true})
  @IsNotEmpty()
  username: string;

  @ApiProperty({required:true})
  @IsNotEmpty()
  old_password: string;

  @ApiProperty({required:true})
  @IsNotEmpty()
  new_password: string;
}
