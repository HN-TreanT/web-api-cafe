import { IsNotEmpty } from "class-validator";

export class PositionCreate {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name: string;
}
