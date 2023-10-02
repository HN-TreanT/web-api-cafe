import { Module } from "@nestjs/common";
import { ProductServices } from "./product.service";
import { productProvider } from "./product.provider";
import { ProductController } from "./product.controller";
import { StorageModule } from "src/helpers/storage/storage.module";

@Module({
  imports: [StorageModule],
  providers: [ProductServices, ...productProvider],
  controllers: [ProductController],
  exports: [ProductServices],
})
export class ProductModule {}
