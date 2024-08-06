import { PROMOTION_REPOSITORY } from "src/constants/repository_enum";
import { Promotion } from "./promotion.entity";

export const promotionProvider = [{ provide: PROMOTION_REPOSITORY, useValue: Promotion }];
