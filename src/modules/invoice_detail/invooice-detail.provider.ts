import { INVOICE_DETAIL_REPOSITORY } from "src/constants/repository_enum";
import { InvoiceDetail } from "./invoice_detail.entity";

export const inoviceDetailProvider = [{ provide: INVOICE_DETAIL_REPOSITORY, useValue: InvoiceDetail }];
