import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TABLEFOOD_INVOICE_REPOSITORY } from "src/constants/repository_enum";
import { TableFoodInvoice } from "./table_food_invoice.entity";
import { PagedData } from "src/models/PagedData";
import { TblInvoiceCreate } from "./dto/tbf-invoice-create";
import { TblInvoiceEdit } from "./dto/tbl-inovice-edit.dto";
import { TableFood } from "../table_food/table_food.entity";
import { Invoice } from "../invoice/invoice.entity";

@Injectable()
export class TablefoodInoviceService {
  @Inject(TABLEFOOD_INVOICE_REPOSITORY) private readonly _repository: typeof TableFoodInvoice;
  async get(pagination: any, filter: any): Promise<PagedData<TableFoodInvoice>> {
    const { count, rows } = await this._repository.findAndCountAll({
      where: { ...filter },
      ...pagination,
      include: [
        {
          model: TableFood,
        },
        {
          model: Invoice,
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
  async getById(id: number): Promise<TableFoodInvoice> {
    const tbInvoice = await this._repository.findByPk(id);
    if (!tbInvoice) throw new NotFoundException({ message: "not found ", status: false });
    return tbInvoice;
  }

  async create(infoCreate: TblInvoiceCreate): Promise<TableFoodInvoice> {
    return await this._repository.create(infoCreate);
  }
  async createMany(data: TblInvoiceCreate[]) {
    await this._repository.bulkCreate(data);
    return true;
  }

  async edit(id: number, infoEdit: TblInvoiceEdit) {
    const tbInvoice = await this._repository.findByPk(id);
    if (!tbInvoice) throw new NotFoundException({ message: "not found ", status: false });
    return await tbInvoice.update(infoEdit);
  }

  async editMany(id_invoice: number, data: TblInvoiceEdit[]) {
    await this._repository.destroy({ where: { id_invoice: id_invoice } });
    await this._repository.bulkCreate(data);
    return true;
  }
  async deleteById(id: number) {
    const tbInvoice = await this._repository.findByPk(id);
    if (!tbInvoice) throw new NotFoundException({ message: "not found ", status: false });
    await tbInvoice.destroy();
    return true;
  }
  async deleteMany(id_invoice?: number, id_table?: number) {
    if (id_invoice) {
      await this._repository.destroy<TableFoodInvoice>({
        where: {
          id_invoice: id_invoice,
        },
      });
    }
    if (id_table) {
      await this._repository.destroy<TableFoodInvoice>({
        where: {
          id_table: id_table,
        },
      });
    }
    return true;
  }
}
