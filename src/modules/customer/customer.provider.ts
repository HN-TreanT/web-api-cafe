import { CUSTOMER_REPOSITORY } from "src/constants/repository_enum";
import { Customer } from "./customer.entity";
export const customerProviders = [{ provide: CUSTOMER_REPOSITORY, useValue: Customer }];
