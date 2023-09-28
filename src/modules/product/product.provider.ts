import { PRODUCT_REPOSITORY, USE_MATERIAL_REPOSITORY } from "src/constants/repository_enum";

import { Product } from "./product.entity";
import { UseMaterial } from "../use_material/use_material.entity";

export const productProvider = [
  { provide: PRODUCT_REPOSITORY, useValue: Product },
  { provide: USE_MATERIAL_REPOSITORY, useValue: UseMaterial },
];
