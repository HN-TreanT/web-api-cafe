import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CHECK_INVENTORY_REPOSITORY, DETAIL_CHECK_INVENTORY_REPOSITORY } from "src/constants/repository_enum";
import { CheckInventory } from "./check_inventory";
import { PagedData } from "src/models/PagedData";
import { CheckInventoryDto } from "./dto/check-invenoty-dto.dto";
import { DetailCheckInventory } from "../detail-check-inventory/detail_check-inventory.entity";
import { CheckInventoryFilter } from "./dto/check-iventory-filter.dto";
import { Op } from "sequelize";
@Injectable()
export class CheckInventoryService {
  constructor(
    @Inject(CHECK_INVENTORY_REPOSITORY) private readonly checkInventoryRepository: typeof CheckInventory,
    @Inject(DETAIL_CHECK_INVENTORY_REPOSITORY) private readonly dtcheckInventoryRepository: typeof DetailCheckInventory
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
      include: [{ model: DetailCheckInventory }],
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
    const checkInventory = await this.checkInventoryRepository.create(infoCreate);
    const data = infoCreate.lst_dt_check.map((item) => {
      return {
        ...item,
        id_detail_check: checkInventory.id,
        shortage_count: item.total_count - item.actual_count,
      };
    });
    await this.dtcheckInventoryRepository.bulkCreate(data);
    return;
  }

  async edit(id: number, infoEdit: CheckInventoryDto): Promise<CheckInventory> {
    const check_inventory = await this.checkInventoryRepository.findByPk(id);
    if (!check_inventory) throw new NotFoundException({ message: "Check inventory not found", status: false });
    const data = infoEdit.lst_dt_check.map((item) => {
      return {
        ...item,
        id_detail_check: check_inventory.id,
        shortage_count: item.total_count - item.actual_count,
      };
    });
    await this.dtcheckInventoryRepository.destroy({ where: { id_detail_check: check_inventory.id } });
    await this.dtcheckInventoryRepository.bulkCreate(data);
    return check_inventory.update(infoEdit);
  }

  async delete(id: number) {
    const check_inventory = await this.checkInventoryRepository.findByPk(id);
    if (!check_inventory) throw new NotFoundException({ message: "Check inventory not found", status: false });
    return check_inventory.destroy();
  }
}
