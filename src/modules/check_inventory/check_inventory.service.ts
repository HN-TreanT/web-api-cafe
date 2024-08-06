import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CHECK_INVENTORY_REPOSITORY, DETAIL_CHECK_INVENTORY_REPOSITORY, MATERIAL_REPOSITORY } from "src/constants/repository_enum";
import { CheckInventory } from "./check_inventory";
import { PagedData } from "src/models/PagedData";
import { CheckInventoryDto } from "./dto/check-invenoty-dto.dto";
import { DetailCheckInventory } from "../detail-check-inventory/detail_check-inventory.entity";
import { CheckInventoryFilter } from "./dto/check-iventory-filter.dto";
import { Op } from "sequelize";
import { Material } from "../material/material.entity";

@Injectable()
export class CheckInventoryService {
  constructor(
    @Inject(CHECK_INVENTORY_REPOSITORY) private readonly checkInventoryRepository: typeof CheckInventory,
    @Inject(DETAIL_CHECK_INVENTORY_REPOSITORY) private readonly dtcheckInventoryRepository: typeof DetailCheckInventory,
    @Inject(MATERIAL_REPOSITORY) private readonly materialRepository: typeof Material
  ) {}
  async get(pagination: any, filter: CheckInventoryFilter): Promise<PagedData<CheckInventory>> {
    let filterData: any = {};
    if (filter.time_end && filter.time_start) {
      filterData.time_check = { [Op.between]: [filter.time_start, filter.time_end] };
    }

    const { count, rows } = await this.checkInventoryRepository.findAndCountAll({
      where: {
        ...filterData,
      },
      order: [["time_check", "DESC"]],
      ...pagination,
      // include: [{ model: DetailCheckInventory }],
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

  async getById(id: number): Promise<CheckInventory> {
    const check_inventory = await this.checkInventoryRepository.findByPk(id, {
      include: [DetailCheckInventory],
    });
    if (!check_inventory) throw new NotFoundException({ message: "Check inventory not found", status: false });
    return check_inventory;
  }

  async create(infoCreate: CheckInventoryDto): Promise<CheckInventory> {
    const checkInventory = await this.checkInventoryRepository.create({
      time_check: infoCreate.time_check,
    });
    if (infoCreate.lst_dt_check) {
      const id_materials = infoCreate.lst_dt_check.map((item) => item.id_material);
      const materials = await this.materialRepository.findAll({ where: { id: id_materials } });

      const data = infoCreate.lst_dt_check.map((item) => {
        const material = materials.find((item1: any) => item.id_material === item1.dataValues.id).toJSON();
        return {
          ...item,
          id_detail_check: checkInventory.id,
          shortage_count: material.amount - item.actual_count,
          total_count: material.amount,
        };
      });
      await this.dtcheckInventoryRepository.bulkCreate(data);
    }
    return checkInventory;
  }

  async edit(id: number, infoEdit: CheckInventoryDto): Promise<CheckInventory> {
    const check_inventory = await this.checkInventoryRepository.findByPk(id);
    if (!check_inventory) throw new NotFoundException({ message: "Check inventory not found", status: false });
    if (infoEdit.lst_dt_check) {
      const id_materials = infoEdit.lst_dt_check.map((item) => item.id_material);
      const materials = await this.materialRepository.findAll({ where: { id: id_materials } });

      const data = infoEdit.lst_dt_check.map((item) => {
        const material = materials.find((item1: any) => item.id_material === item1.dataValues.id).toJSON();
        return {
          ...item,
          id_detail_check: check_inventory.id,
          shortage_count: material.amount - item.actual_count,
          total_count: material.amount,
        };
      });
      await this.dtcheckInventoryRepository.destroy({ where: { id_detail_check: check_inventory.id } });
      await this.dtcheckInventoryRepository.bulkCreate(data);
    }

    return check_inventory.update(infoEdit);
  }

  async delete(id: number) {
    const check_inventory = await this.checkInventoryRepository.findByPk(id);
    if (!check_inventory) throw new NotFoundException({ message: "Check inventory not found", status: false });
    return check_inventory.destroy();
  }

  async synchronizedWarehouse(id_check_inventory: number) {
    const check_inventory = await this.checkInventoryRepository.findByPk(id_check_inventory, {
      include: [
        {
          model: DetailCheckInventory,
        },
      ],
    });
    if (!check_inventory) throw new NotFoundException({ message: "not found check inventory ", status: false });

    if (check_inventory.detail_check_inventories) {
      check_inventory.detail_check_inventories.forEach(async (item) => {
        await this.materialRepository.update({ amount: item.actual_count }, { where: { id: item.id_material } });
      });
    }
    return check_inventory;
  }
}
