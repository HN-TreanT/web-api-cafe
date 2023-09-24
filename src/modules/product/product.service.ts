import { Inject, Injectable } from "@nestjs/common";
import { PRODUCT_REPOSITORY } from "src/constants/repository_enum";
import { Product } from "./product.entity";

@Injectable()
export class ProductServices {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product) {}
}
