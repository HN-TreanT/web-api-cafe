import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { INVOICE_DETAIL_REPOSITORY, INVOICE_REPOSITORY, TABLEFOOD_INVOICE_REPOSITORY, TABLEFOOD_REPOSITORY } from "src/constants/repository_enum";
import { Invoice } from "./invoice.entity";
import { PagedData } from "src/models/PagedData";
import { InvoiceCreate } from "./dto/invoice-create.dto";
import { InoviceEdit } from "./dto/invoice-edit.dto";
import { Employee } from "../employee/employee.entity";
import { Promotion } from "../promotion/promotion.entity";
import { Customer } from "../customer/customer.entity";
import { TableFoodInvoice } from "../table_food_invoice/table_food_invoice.entity";
import { FilterDto } from "./dto/filter.dto";
import { Op, Sequelize } from "sequelize";
import { OrderInvoiceDto } from "./dto/order.dto";
import { InvoiceDetail } from "../invoice_detail/invoice_detail.entity";
import { ProductServices } from "../product/product.service";
import { TableFood } from "../table_food/table_food.entity";
import { SplitInvoice } from "./dto/split-invoice.dto";
import { CombineInvoice } from "./dto/combine-invoice.dto";
import { TblInvoiceCreate } from "../table_food_invoice/dto/tbf-invoice-create";
import { TablefoodInoviceService } from "../table_food_invoice/tablefood-invoice.service";
import { TblInvoiceEdit } from "../table_food_invoice/dto/tbl-inovice-edit.dto";

@Injectable()
export class InvoiceService {
  constructor(
    @Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: typeof Invoice,
    @Inject(INVOICE_DETAIL_REPOSITORY) private readonly invoiceDetaiRepository: typeof InvoiceDetail,
    private readonly productService: ProductServices,
    @Inject(TABLEFOOD_INVOICE_REPOSITORY) private readonly tablefoodInvoiceRepository: typeof TableFoodInvoice,
    private readonly tableInvoiceService: TablefoodInoviceService
  ) {}

  async get(pagination: any, filter: FilterDto, order: OrderInvoiceDto): Promise<PagedData<Invoice>> {
    let filterInvoice: any = {};
    let filterCustomer: any = {};
    let orderInvoice: any = [];
    if (filter.id_customer) filterInvoice.id_customer = filter.id_customer;
    if (filter.id_employee) filterInvoice.id_employee = filter.id_employee;
    if (filter.id_promotion) filterInvoice.id_promotion = filter.id_promotion;
    if (filter.status) filterInvoice.status = filter.status;
    if (filter.time_start && filter.time_end) filterInvoice.createdAt = { [Op.between]: [filter.time_start, filter.time_end] };

    if (filter.name_customer) filterCustomer.name = { [Op.substring]: filter.name_customer };
    if (filter.email) filterCustomer.email = filter.email;
    if (filter.phone_number) filterCustomer.phone_number = filter.phone_number;

    if (order.createdAt) orderInvoice = [...orderInvoice, ["createdAt", `${order.createdAt}`]];
    if (order.order_price) orderInvoice = [...orderInvoice, ["price", `${order.order_price}`]];
    if (order.order_time_pay) orderInvoice = [...orderInvoice, ["time_pay", `${order.order_time_pay}`]];

    const { count, rows } = await this.invoiceRepository.findAndCountAll({
      where: { ...filterInvoice },
      order: [...orderInvoice],
      ...pagination,
      include: [
        {
          model: Employee,
          attributes: { exclude: ["password"] },
        },
        { model: Promotion },
        {
          model: Customer,
          where: {
            ...filterCustomer,
          },
        },
        {
          model: TableFoodInvoice,
          where: filter.id_table
            ? {
                id_table: filter.id_table,
              }
            : null,
        },
        {
          model: InvoiceDetail,
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

  async getById(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findByPk(id, {
      include: [
        {
          model: Employee,
          attributes: { exclude: ["password"] },
        },
        { model: Promotion },
        {
          model: Customer,
        },
        {
          model: TableFoodInvoice,
        },
        {
          model: InvoiceDetail,
        },
      ],
    });
    if (!invoice) throw new NotFoundException({ message: "not found invoice ", status: false });
    return invoice;
  }

  async create(infoCreate: InvoiceCreate): Promise<Invoice> {
    const invoice = await this.invoiceRepository.create(infoCreate);
    let invoice_details: any = [];
    let table_food_invoices: TblInvoiceCreate[];
    let price: number = 0;
    //create invoice detail
    if (infoCreate.lst_invoice_detail) {
      invoice_details = infoCreate.lst_invoice_detail.map((item) => {
        price = price + item.price;
        return {
          ...item,
          id_invoice: invoice.id,
        };
      });
    }
    //create table_invoice
    if (infoCreate.id_tables) {
      table_food_invoices = infoCreate.id_tables.map((item) => {
        return {
          id_table: item,
          id_invoice: invoice.id,
        };
      });
    }

    await this.tableInvoiceService.createMany(table_food_invoices);
    await this.invoiceDetaiRepository.bulkCreate(invoice_details);
    invoice.price = price;
    return await invoice.save();
  }

  async edit(id: number, infoEdit: InoviceEdit): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findByPk(id);

    if (!invoice) throw new NotFoundException({ message: "not found invoice ", status: false });
    let price: any = {};
    //edit invoice_detail
    if (infoEdit.lst_invoice_detail) {
      price = infoEdit.lst_invoice_detail.reduce((partialSum, item) => partialSum + item.price, 0);
      infoEdit.price = price;
      await this.invoiceDetaiRepository.destroy({ where: { id_invoice: invoice.id } });
      await this.invoiceDetaiRepository.bulkCreate(infoEdit.lst_invoice_detail);
    }

    //edit invoice_table
    if (infoEdit.id_tables) {
      const table_food_invoices: TblInvoiceEdit[] = infoEdit.id_tables.map((item) => {
        return {
          id_table: item,
          id_invoice: invoice.id,
        };
      });

      await this.tableInvoiceService.editMany(invoice.id, table_food_invoices);
    }

    return await invoice.update(infoEdit);
  }
  async deleteById(id: number) {
    await this.invoiceDetaiRepository.destroy({ where: { id_invoice: id } });
    await this.tableInvoiceService.deleteMany(id, null);
    await this.invoiceRepository.destroy({ where: { id: id } });
    return true;
  }

  async splitInvoice(splitInvoice: SplitInvoice) {
    const oldInvoice = await this.invoiceRepository.findByPk(splitInvoice.id_old_order, {
      include: [InvoiceDetail],
    });

    /////////=============CREATE NEW INOVICE =================///////////
    const invocie = await this.invoiceRepository.create({ id_employee: oldInvoice.id_employee });

    let invoice_details: any = [];
    let table_food_invoices: TblInvoiceCreate[] = [];
    let price: number = 0;
    //create new invoice detail
    if (splitInvoice.lst_inovice_detail) {
      invoice_details = splitInvoice.lst_inovice_detail.map((item) => {
        price = price + item.price;
        return {
          ...item,
          id_invoice: invocie.id,
        };
      });
    }

    // create new invoice table
    if (splitInvoice.id_tables) {
      table_food_invoices = splitInvoice.id_tables.map((item) => {
        return {
          id_table: item,
          id_invoice: invocie.id,
        };
      });
    }

    await this.invoiceDetaiRepository.bulkCreate(invoice_details);
    await this.tablefoodInvoiceRepository.bulkCreate(table_food_invoices);

    invocie.price = price;
    await invocie.save();
    ////////////////////////////////////////////////////////////////

    //====================UPDATE INVOICE DETAIL OF OLD INVOICE ===================////
    if (!oldInvoice) throw new NotFoundException({ message: "not found invoice", status: false });
    oldInvoice.invoice_details.forEach(async (item) => {
      if (splitInvoice.lst_inovice_detail) {
        splitInvoice.lst_inovice_detail.forEach(async (item2) => {
          if (item2.id_product === item.id_product || item2.id_combo === item.id_combo) {
            if (item.amount === item2.amount) {
              await this.invoiceDetaiRepository.destroy({ where: { id: item.id } });
            } else {
              const data = {
                ...item2,
                id_invoice: oldInvoice.id,
                amount: item.amount - item2.amount,
                price: item.price - item2.price,
                isCombo: item2.id_combo ? true : false,
              };
              await this.invoiceDetaiRepository.update(data, { where: { id: item.id } });
            }
          }
        });
      }
    });

    ////////////////////////////////////////////////////////////////
    return invocie;
  }

  async combineInvocie(isCombineTable: boolean, combineInvocie: CombineInvoice) {
    const old_invoice = await this.invoiceRepository.findByPk(combineInvocie.id_invoice_old, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [InvoiceDetail],
    });
    const new_invoice = await this.invoiceRepository.findByPk(combineInvocie.id_invoice_new, {
      include: [InvoiceDetail],
    });
    if (!old_invoice || !new_invoice) throw new NotFoundException({ message: "not found invoice ", status: false });
    const combinedData = new Map();
    function addToMap(array: any) {
      for (const item of array) {
        const key = item.id_product || item.id_combo;
        if (combinedData.has(key)) {
          const existingItem = combinedData.get(key);
          existingItem.amount += item.amount;
          existingItem.price += item.price;
        } else {
          combinedData.set(key, { ...item });
        }
      }
    }
    addToMap(new_invoice.toJSON().invoice_details);
    addToMap(old_invoice.toJSON().invoice_details);
    const combinedArray = Array.from(combinedData.values());
    const dataUpdate = combinedArray.map((item) => {
      return {
        id_invoice: new_invoice.id,
        id_product: item.id_product,
        id_combo: item.id_combo,
        isCombo: item.isCombo,
        price: item.price,
        amount: item.amount,
      };
    });
    if (isCombineTable) {
      await this.tablefoodInvoiceRepository.destroy({ where: { id_invoice: old_invoice.id } });
    } else {
      await this.tablefoodInvoiceRepository.update({ id_invoice: new_invoice.id }, { where: { id_invoice: old_invoice.id } });
    }
    await this.invoiceDetaiRepository.destroy({ where: { id_invoice: old_invoice.id } });
    await old_invoice.destroy();
    await this.invoiceDetaiRepository.destroy({ where: { id_invoice: new_invoice.id } });
    await this.invoiceDetaiRepository.bulkCreate(dataUpdate);
    let price = dataUpdate.reduce((partialSum, item) => partialSum + item.price, 0);
    new_invoice.price = price;
    await new_invoice.save();

    return dataUpdate;
  }
}
