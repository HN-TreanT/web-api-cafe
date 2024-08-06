import { Module } from "@nestjs/common";
import { ComboService } from "./combo.service";
import { comboProvider } from "./combo.provider";
import { ComboController } from "./combo.controller";
import { DetailComboModule } from "../detail_combo/detail-combo.module";
import { ProductModule } from "../product/product.module";
import { ProductServices } from "../product/product.service";

@Module({
  imports: [DetailComboModule, ProductModule],
  providers: [ComboService, ...comboProvider],
  controllers: [ComboController],
  exports: [ComboService],
})
export class ComboModule {}
