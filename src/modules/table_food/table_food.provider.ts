import { TABLEFOOD_REPOSITORY } from "src/constants/repository_enum";
import { TableFood } from "./table_food.entity";

export const provider = [{ provide: TABLEFOOD_REPOSITORY, useValue: TableFood }];
