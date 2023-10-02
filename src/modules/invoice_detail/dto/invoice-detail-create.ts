import { IsNotEmpty } from "class-validator";

export class InvoiceDetailCreate {
  @IsNotEmpty()
  id_invoice: number;
  id_product: number;
  id_combo: number;
  isCombo: boolean;
  price: number;
  amount: number;
}
