import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpFaceDTO {
  @IsNotEmpty()
  name: string;

  id: number;
}
