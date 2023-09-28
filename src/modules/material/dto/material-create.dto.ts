import { IsNotEmpty } from "class-validator";

export class MaterialCreate {
  @IsNotEmpty()
  name: string;
  description: string;
  amount: number;
  unit: string;
  expriation_date: Date;
}
