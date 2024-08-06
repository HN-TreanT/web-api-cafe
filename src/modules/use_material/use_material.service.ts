import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { USE_MATERIAL_REPOSITORY } from "src/constants/repository_enum";
import { UseMaterial } from "./use_material.entity";
import { PagedData } from "src/models/PagedData";
import { UseMaterialCreate } from "./dto/use-material-create.dto";
import { UseMaterialEdit } from "./dto/use-material-edit.dto";
import { Worker } from "cluster";
import { Material } from "../material/material.entity";
import { Product } from "../product/product.entity";

@Injectable()
export class UseMaterialService {
  constructor(@Inject(USE_MATERIAL_REPOSITORY) private readonly useMaterialRepository: typeof UseMaterial) {}
  async get(pagination: any, filter: any): Promise<PagedData<UseMaterial>> {
    const { count, rows } = await this.useMaterialRepository.findAndCountAll({
      where: { ...filter },
      ...pagination,
      include: [
        {
          model: Material,
        },
        {
          model: Product,
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
  async getById(id: number): Promise<UseMaterial> {
    const use_material = await this.useMaterialRepository.findByPk(id);
    if (!use_material) throw new NotFoundException({ message: "not found ", status: false });
    return use_material;
  }

  async create(infoCreate: UseMaterialCreate): Promise<UseMaterial> {
    return await this.useMaterialRepository.create(infoCreate);
  }

  async createMany(infoCreate: UseMaterialCreate[]): Promise<any> {
    const data = await this.useMaterialRepository.bulkCreate(infoCreate);
    return data
  }

  async edit(id: number, infoEdit: UseMaterialEdit) {
    const use_material = await this.useMaterialRepository.findByPk(id);
    if (!use_material) throw new NotFoundException({ message: "not found ", status: false });
    return await use_material.update(infoEdit);
  }
  async deleteById(id: number) {
    const use_material = await this.useMaterialRepository.findByPk(id);
    if (!use_material) throw new NotFoundException({ message: "not found ", status: false });
    await use_material.destroy();
    return true;
  }
  s;
}
