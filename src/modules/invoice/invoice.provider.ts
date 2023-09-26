import { Invoice } from "./invoice.entity";
import { INVOICE_REPOSITORY } from "src/constants/repository_enum";

export const invoiceProvider = [{ provide: INVOICE_REPOSITORY, useValue: Invoice }];
