import { Module } from "@nestjs/common";
import { UseMaterialService } from "./use_material.service";
import { useMaterialProvider } from "./use_material.provider";
import { UseMaterialController } from "./use_material.controller";

@Module({
  imports: [],
  controllers: [UseMaterialController],
  providers: [UseMaterialService, ...useMaterialProvider],
  exports: [UseMaterialService],
})
export class UserMaterialModule {}
