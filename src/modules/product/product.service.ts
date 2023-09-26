import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PRODUCT_REPOSITORY } from "src/constants/repository_enum";
import { Product } from "./product.entity";
import { PagedData } from "src/models/PagedData";
import { Category } from "../category/category.entity";
import { UseMaterial } from "../use_material/use_material.entity";
import { Material } from "../material/material.entity";
import { ProductCreate } from "./dto/product-create.dto";
import { ProductEdit } from "./dto/product-edit.dto";
import { StorageService } from "src/helpers/storage/storage.service";

@Injectable()
export class ProductServices {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product,
    private readonly storageSerice: StorageService
  ) {}
  async get(pagination: any, filter: any): Promise<PagedData<Product>> {
    const { count, rows } = await this.productRepository.findAndCountAll({
      where: { ...filter },
      ...pagination,
      include: [
        {
          model: Category,
        },
        {
          model: UseMaterial,
          include: [Material],
        },
      ],
    });
    const pageNumber = pagination.offset / pagination.limit + 1;
    const data = {
      CurrentPage: pageNumber,
      TotalPage: count,
      CanNext: pageNumber < count,
      CanBack: pageNumber > 1,
      data: rows,
    };
    return data;
  }

  async getById(id: number): Promise<Product> {
    const product = await this.productRepository.findByPk(id, {
      include: [
        {
          model: Category,
        },
        {
          model: UseMaterial,
          include: [Material],
        },
      ],
    });
    if (!product) throw new NotFoundException({ message: "not found product", status: false });
    return product;
  }

  async create(infoCreate: ProductCreate, file: Express.Multer.File): Promise<Product> {
    const product = await this.productRepository.create(infoCreate);
    if (file) {
      const upload = await this.storageSerice.uploadFile(file, "");
      product.image = upload.publicUrl;
    }
    return await product.save();
  }

  async edit(id: number, infoEdit: ProductEdit, file: Express.Multer.File): Promise<Product> {
    const product = await this.productRepository.findByPk(id);
    if (!product) throw new NotFoundException({ message: "not found product", status: false });
    if (file) {
      await this.storageSerice.deleteFile(product.image.split("/")[4]);
      const updload = await this.storageSerice.uploadFile(file, "");
      infoEdit.image = updload.publicUrl;
    }
    return product.update(infoEdit);
  }

  async deleteById(id: number) {
    const product = await this.productRepository.findByPk(id);
    if (!product) throw new NotFoundException({ message: "not found product", status: false });
    if (product.image) {
      await this.storageSerice.deleteFile(product.image.split("/")[4]);
    }
    return product.destroy();
  }
}
