import { Module } from "@nestjs/common";
import { PromotionServices } from "./promotion.service";
import { promotionProvider } from "./promotion.provider";
import { PromotionController } from "./promotion.controller";

@Module({
  imports: [],
  providers: [PromotionServices, ...promotionProvider],
  controllers: [PromotionController],
  exports: [PromotionServices],
})
export class PromotionModule {}
