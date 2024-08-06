import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { categoryProvider } from "./category.provicder";
import { CategoryController } from "./category.controller";

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryService, ...categoryProvider],
  exports: [CategoryService],
})
export class CategoryModule {}
