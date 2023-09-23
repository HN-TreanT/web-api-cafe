import { IsNotEmpty } from "class-validator";

export default class InfoChangePassword {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  old_password: string;
  @IsNotEmpty()
  new_password: string;
}
