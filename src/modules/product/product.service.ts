import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PRODUCT_REPOSITORY, USE_MATERIAL_REPOSITORY } from "src/constants/repository_enum";
import { Product } from "./product.entity";
import { PagedData } from "src/models/PagedData";
import { Category } from "../category/category.entity";
import { UseMaterial } from "../use_material/use_material.entity";
import { Material } from "../material/material.entity";
import { ProductCreate } from "./dto/product-create.dto";
import { ProductEdit } from "./dto/product-edit.dto";
import { StorageService } from "src/helpers/storage/storage.service";
import { ProductFilter } from "./dto/product-filter.dto";
import { ProductOrder } from "./dto/product-order.dto";
import { Op } from "sequelize";
import { Exception } from "handlebars";

@Injectable()
export class ProductServices {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product,
    @Inject(USE_MATERIAL_REPOSITORY) private readonly useMaterialRepository: typeof UseMaterial,
    private readonly storageSerice: StorageService
  ) {}
  async get(pagination: any, filter: ProductFilter, order: ProductOrder): Promise<PagedData<Product>> {
    let filterProduct: any = {};
    let orderProduct: any = [];
    if (filter.id_category) {
      filterProduct.id_category = filter.id_category;
    }
    if (filter.name) filterProduct.name = { [Op.substring]: filter.name };
    if (order.order_name) orderProduct = [...orderProduct, ["name", `${order.order_name}`]];
    if (order.order_price) orderProduct = [...orderProduct, ["price", `${order.order_price}`]];
    const { count, rows } = await this.productRepository.findAndCountAll({
      where: { ...filterProduct },
      order: [...orderProduct],
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
    const total = await this.productRepository.count({ where: { ...filterProduct } });

    const pageNumber = pagination.offset / pagination.limit + 1;
    const data = {
      CurrentPage: pageNumber,
      TotalPage: total,
      CanNext: pageNumber < total,
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
    if (infoCreate.lst_use_material) {
      const use_materials = infoCreate.lst_use_material.map((item) => {
        return {
          ...item,
          id_product: product.id,
        };
      });
      await this.useMaterialRepository.bulkCreate(use_materials);
    }
    if (file) {
      const upload = await this.storageSerice.uploadFile(file, "");
      product.image = upload.publicUrl;
    }
    return await product.save();
  }

  async edit(id: number, infoEdit: ProductEdit, file: Express.Multer.File): Promise<Product> {
    const product = await this.productRepository.findByPk(id);

    if (!product) throw new NotFoundException({ message: "not found product", status: false });
    if (infoEdit.lst_use_material) {
      const use_materials = infoEdit.lst_use_material.map((item) => {
        return {
          ...item,
          id_product: product.id,
        };
      });
      await this.useMaterialRepository.destroy({
        where: {
          id_product: product.id,
        },
      });
      await this.useMaterialRepository.bulkCreate(use_materials);
    }

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

  async checkValidMaterial(amount: number, id_product: number) {
    const product = await this.productRepository.findByPk(id_product, {
      include: [
        {
          model: UseMaterial,
          include: [Material],
        },
      ],
    });
    if (!product) throw new NotFoundException({ message: "not found product", status: false });
    if (product.use_materials) {
      product.use_materials.map((item) => {
        if (item.amount * amount > item.material.amount) {
          throw new NotFoundException({ message: `Số lượng nguyên liệu ${item.material.name} không đủ `, status: false });
        }
      });
    }

    return true;
  }
}
