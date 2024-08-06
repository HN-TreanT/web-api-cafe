import { TABLEFOOD_INVOICE_REPOSITORY } from "src/constants/repository_enum";
import { TableFoodInvoice } from "./table_food_invoice.entity";

export const provider = [{ provide: TABLEFOOD_INVOICE_REPOSITORY, useValue: TableFoodInvoice }];
