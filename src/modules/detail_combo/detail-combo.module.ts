import { Module } from "@nestjs/common";
import { DetailComboController } from "./detail-combo.controller";
import { DetailComboService } from "./detail-combo.service";
import { detialComboProvider } from "./detail-combo.provider";

@Module({
  imports: [],
  controllers: [DetailComboController],
  providers: [DetailComboService, ...detialComboProvider],
  exports: [DetailComboService],
})
export class DetailComboModule {}
