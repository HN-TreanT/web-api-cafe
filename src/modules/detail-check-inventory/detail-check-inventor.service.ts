import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DETAIL_CHECK_INVENTORY_REPOSITORY } from "src/constants/repository_enum";
import { DetailCheckInventory } from "./detail_check-inventory.entity";
import { PagedData } from "src/models/PagedData";
import { DTCheckInventoryCreate } from "./dto/dt-check-inventory-create.dto";
import { DTCheckInventoryEdit } from "./dto/dt-check-inventory-edit";
import { Material } from "../material/material.entity";
import { CheckInventory } from "../check_inventory/check_inventory";
@Injectable()
export class DtCheckInventorService {
  constructor(@Inject(DETAIL_CHECK_INVENTORY_REPOSITORY) private readonly _repository: typeof DetailCheckInventory) {}
  async get(pagination: any, filter: any): Promise<PagedData<DetailCheckInventory>> {
    let filterData: any = {};
    if (filter.id_detail_check) filterData.id_detail_check = filter.id_detail_check;
    const { count, rows } = await this._repository.findAndCountAll({
      where: { ...filterData },
      ...pagination,
      include: [{ model: Material }, { model: CheckInventory }],
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

  async getById(id: number): Promise<DetailCheckInventory> {
    const record = await this._repository.findByPk(id, {});
    if (!record) throw new NotFoundException({ message: "not found ", status: false });
    return record;
  }

  async create(infoCreate: DTCheckInventoryCreate): Promise<DetailCheckInventory> {
    return await this._repository.create(infoCreate);
  }

  async edit(id: number, editInfo: DTCheckInventoryEdit): Promise<DetailCheckInventory> {
    const record = await this._repository.findByPk(id);
    if (!record) throw new NotFoundException({ message: "not found ", status: false });
    return record.update(editInfo);
  }

  async deleteById(id: number) {
    const record = await this._repository.destroy({ where: { id: id } });
    if (!record) throw new NotFoundException({ message: "not found ", status: false });
    return true;
  }
}
