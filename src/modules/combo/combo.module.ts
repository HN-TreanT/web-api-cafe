import { Module } from "@nestjs/common";
import { ComboService } from "./combo.service";
import { comboProvider } from "./combo.provider";
import { ComboController } from "./combo.controller";
import { DetailComboModule } from "../detail_combo/detail-combo.module";

@Module({
  imports: [DetailComboModule],
  providers: [ComboService, ...comboProvider],
  controllers: [ComboController],
  exports: [ComboService],
})
export class ComboModule {}