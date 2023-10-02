import { InvoiceDetail } from "../invoice_detail/invoice_detail.entity";
import { Material } from "../material/material.entity";
import { Invoice } from "./invoice.entity";
import { INVOICE_DETAIL_REPOSITORY, INVOICE_REPOSITORY, MATERIAL_REPOSITORY } from "src/constants/repository_enum";

export const invoiceProvider = [
  { provide: INVOICE_REPOSITORY, useValue: Invoice },
  { provide: INVOICE_DETAIL_REPOSITORY, useValue: InvoiceDetail },
  { provide: MATERIAL_REPOSITORY, useValue: Material },
];
