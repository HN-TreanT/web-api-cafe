import { IsEmpty, IsNotEmpty } from "class-validator";
import { InvoiceDetailEdit } from "src/modules/invoice_detail/dto/invoice-detail-edit";

export class SplitInvoice {
  @IsNotEmpty()
  id_old_order: number;
  lst_inovice_detail: InvoiceDetailEdit[];
  id_tables: number[];
}
