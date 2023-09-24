import { Module } from "@nestjs/common";
import { ProductServices } from "./product.service";
import { productProvider } from "./product.provider";
import { ProductController } from "./product.controller";

@Module({
  imports: [],
  providers: [ProductServices, ...productProvider],
  controllers: [ProductController],
})
export class ProductModule {}
