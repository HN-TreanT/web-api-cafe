import { USE_MATERIAL_REPOSITORY } from "src/constants/repository_enum";

import { UseMaterial } from "./use_material.entity";

export const useMaterialProvider = [{ provide: USE_MATERIAL_REPOSITORY, useValue: UseMaterial }];
