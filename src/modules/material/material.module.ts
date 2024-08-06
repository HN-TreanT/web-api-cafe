import { Module } from "@nestjs/common";
import { MaterialSerivce } from "./material.service";
import { materialProvider } from "./material.provider";
import { MaterialController } from "./material.controller";

@Module({
  imports: [],
  providers: [MaterialSerivce, ...materialProvider],
  controllers: [MaterialController],
  exports: [MaterialSerivce],
})
export class MaterialModule {}
