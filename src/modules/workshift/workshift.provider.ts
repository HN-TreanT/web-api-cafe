import { WORKSHIFT_REPOSITORY } from "src/constants/repository_enum";
import { Workshift } from "./workshift.entity";
export const workshiftProviders = [{ provide: WORKSHIFT_REPOSITORY, useValue: Workshift }];
