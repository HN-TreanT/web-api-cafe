import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CategoryDto {
  @ApiProperty({required:true})
  @IsNotEmpty()
  name: string;
}
