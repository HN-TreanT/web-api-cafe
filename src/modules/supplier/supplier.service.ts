import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { SUPPLIER_REPOSITORY } from "src/constants/repository_enum";
import { Supplier } from "./supplier.entity";
import { PagedData } from "src/models/PagedData";
import { SupplierCreate } from "./dto/supplier-create.dto";
import { SupplierEdit } from "./dto/supplier-edit.dto";
import { Op } from "sequelize";

@Injectable()
export class SupplierSerivce {
  constructor(@Inject(SUPPLIER_REPOSITORY) private readonly supplierRepository: typeof Supplier) {}
  async get(pagination: any, search: string): Promise<PagedData<Supplier>> {
    let filter: any = {};

    if (search) {
      filter[Op.or] = {
        name: { [Op.substring]: search },
        email: search,
        phone_number: search,
        address: { [Op.substring]: search },
      };
    }
    const { count, rows } = await this.supplierRepository.findAndCountAll({
      where: { ...filter },
      ...pagination,
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

  async getById(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findByPk(id);
    if (!supplier) throw new NotFoundException({ message: "not found supplier", status: false });
    return supplier;
  }

  async create(infoCreate: SupplierCreate): Promise<Supplier> {
    return await this.supplierRepository.create(infoCreate);
  }

  async edit(id: number, infoEdit: SupplierEdit): Promise<Supplier> {
    const supplier = await this.supplierRepository.findByPk(id);
    if (!supplier) throw new NotFoundException({ message: "not found supplier", status: false });
    return supplier.update(infoEdit);
  }

  async deleteById(id: number) {
    const supplier = await this.supplierRepository.findByPk(id);
    if (!supplier) throw new NotFoundException({ message: "not found supplier", status: false });
    await supplier.destroy();
    return true;
  }
}
