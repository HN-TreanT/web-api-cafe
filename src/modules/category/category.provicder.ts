import { CATEGORY_REPOSITORY } from "src/constants/repository_enum";

import { Category } from "./category.entity";

export const categoryProvider = [{ provide: CATEGORY_REPOSITORY, useValue: Category }];
