import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { StorageService } from "./storage.service";

@Module({
  imports: [ConfigModule],
  providers: [StorageService, ConfigService],
  exports: [StorageService],
})
export class StorageModule {}
