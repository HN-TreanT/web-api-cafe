import { InvoiceDetail } from "../invoice_detail/invoice_detail.entity";
import { Material } from "../material/material.entity";
import { TableFood } from "../table_food/table_food.entity";
import { TableFoodInvoice } from "../table_food_invoice/table_food_invoice.entity";
import { Invoice } from "./invoice.entity";
import {
  INVOICE_DETAIL_REPOSITORY,
  INVOICE_REPOSITORY,
  MATERIAL_REPOSITORY,
  TABLEFOOD_INVOICE_REPOSITORY,
  TABLEFOOD_REPOSITORY,
} from "src/constants/repository_enum";

export const invoiceProvider = [
  { provide: INVOICE_REPOSITORY, useValue: Invoice },
  { provide: INVOICE_DETAIL_REPOSITORY, useValue: InvoiceDetail },
  { provide: MATERIAL_REPOSITORY, useValue: Material },
  { provide: TABLEFOOD_INVOICE_REPOSITORY, useValue: TableFoodInvoice },
  { provide: TABLEFOOD_REPOSITORY, useValue: TableFood },
  { provide: MATERIAL_REPOSITORY, useValue: Material },
];
