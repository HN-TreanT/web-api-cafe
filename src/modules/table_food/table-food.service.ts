import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TABLEFOOD_INVOICE_REPOSITORY, TABLEFOOD_REPOSITORY } from "src/constants/repository_enum";
import { TableFood } from "./table_food.entity";
import { PagedData } from "src/models/PagedData";
import { TableFoodDto } from "./dto/table-food.dto";
import { TablefoodInoviceService } from "../table_food_invoice/tablefood-invoice.service";

@Injectable()
export class TableFoodService {
  constructor(
    @Inject(TABLEFOOD_REPOSITORY) private readonly tableFoodRepository: typeof TableFood,
    private readonly _tableFoodInvoiceService: TablefoodInoviceService
  ) {}

  async get(pagination: any, filter: any): Promise<PagedData<TableFood>> {
    const { count, rows } = await this.tableFoodRepository.findAndCountAll({
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
  async getById(id: number): Promise<TableFood> {
    const table = await this.tableFoodRepository.findByPk(id);
    if (!table) throw new NotFoundException({ message: "not found table", status: false });
    return table;
  }

  async create(infoCreate: TableFoodDto): Promise<TableFood> {
    return await this.tableFoodRepository.create(infoCreate);
  }

  async update(id: number, infoUpdate: TableFoodDto): Promise<TableFood> {
    const table = await this.tableFoodRepository.findByPk(id);
    if (!table) throw new NotFoundException({ message: "not found table", status: false });
    return await table.update(infoUpdate);
  }
  async deleteById(id: number) {
    const table = await this.tableFoodRepository.findByPk(id);
    if (!table) throw new NotFoundException({ message: "not found table", status: false });
    await this._tableFoodInvoiceService.deleteMany(null, id);
    await table.destroy();
    return true;
  }
}
