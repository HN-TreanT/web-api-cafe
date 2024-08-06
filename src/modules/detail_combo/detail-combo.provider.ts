import { DETAIL_COMBO_REPOSITORY } from "src/constants/repository_enum";

import { DetailCombo } from "./detail_combo.entity";

export const detialComboProvider = [{ provide: DETAIL_COMBO_REPOSITORY, useValue: DetailCombo }];
