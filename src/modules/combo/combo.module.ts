import { Module } from "@nestjs/common";
import { ComboService } from "./combo.service";
import { comboProvider } from "./combo.provider";
import { ComboController } from "./combo.controller";

@Module({
  imports: [],
  providers: [ComboService, ...comboProvider],
  controllers: [ComboController],
  exports: [ComboService],
})
export class ComboModule {}
