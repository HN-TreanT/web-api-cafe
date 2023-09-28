import { SUPPLIER_REPOSITORY } from "src/constants/repository_enum";
import { Supplier } from "./supplier.entity";

export const supplierProvider = [{ provide: SUPPLIER_REPOSITORY, useValue: Supplier }];
