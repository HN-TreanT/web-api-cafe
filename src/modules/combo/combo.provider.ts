import { COMBO_REPOSITORY, DETAIL_COMBO_REPOSITORY, PRODUCT_REPOSITORY } from "src/constants/repository_enum";

import { Combo } from "./combo.entity";
import { DetailCombo } from "../detail_combo/detail_combo.entity";
import { Product } from "../product/product.entity";

export const comboProvider = [
  { provide: COMBO_REPOSITORY, useValue: Combo },
  { provide: DETAIL_COMBO_REPOSITORY, useValue: DetailCombo },
];
