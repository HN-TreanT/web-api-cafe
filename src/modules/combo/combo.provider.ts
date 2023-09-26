import { COMBO_REPOSITORY } from "src/constants/repository_enum";

import { Combo } from "./combo.entity";

export const comboProvider = [{ provide: COMBO_REPOSITORY, useValue: Combo }];
