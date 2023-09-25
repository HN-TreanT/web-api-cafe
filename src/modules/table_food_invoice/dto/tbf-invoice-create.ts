import { IsNotEmpty } from "class-validator";

export class TblInvoiceCreate {
  @IsNotEmpty()
  id_table: number;
  @IsNotEmpty()
  id_invoice: number;
}
