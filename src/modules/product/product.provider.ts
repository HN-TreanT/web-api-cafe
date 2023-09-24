import { PRODUCT_REPOSITORY } from "src/constants/repository_enum";

import { Product } from "./product.entity";

export const productProvider = [{ provide: PRODUCT_REPOSITORY, useValue: Product }];
