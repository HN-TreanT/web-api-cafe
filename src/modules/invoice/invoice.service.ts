import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { INVOICE_REPOSITORY } from "src/constants/repository_enum";
import { Invoice } from "./invoice.entity";
import { PagedData } from "src/models/PagedData";
import { InvoiceCreate } from "./dto/invoice-create.dto";
import { InoviceEdit } from "./dto/invoice-edit.dto";
import { Employee } from "../employee/employee.entity";
import { Promotion } from "../promotion/promotion.entity";
import { Customer } from "../customer/customer.entity";
import { TableFoodInvoice } from "../table_food_invoice/table_food_invoice.entity";
import { FilterDto } from "./dto/filter.dto";
import { Op } from "sequelize";
import { OrderInvoiceDto } from "./dto/order.dto";

@Injectable()
export class InvoiceService {
  constructor(@Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: typeof Invoice) {}

  async get(pagination: any, filter: FilterDto, order: OrderInvoiceDto): Promise<PagedData<Invoice>> {
    let filterInvoice: any = {};
    let filterCustomer: any = {};
    let orderInvoice: any = [];
    if (filter.id_customer) filterInvoice.id_customer = filter.id_customer;
    if (filter.id_employee) filterInvoice.id_employee = filter.id_employee;
    if (filter.id_promotion) filterInvoice.id_promotion = filter.id_promotion;
    if (filter.status) filterInvoice.id_promotion = filter.status;

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
    const invoice = await this.invoiceRepository.findByPk(id);
    if (!invoice) throw new NotFoundException({ message: "not found invoice ", status: false });
    return invoice;
  }

  async create(infoCreate: InvoiceCreate): Promise<Invoice> {
    return await this.invoiceRepository.create(infoCreate);
  }

  async edit(id: number, infoEdit: InoviceEdit): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findByPk(id);
    if (!invoice) throw new NotFoundException({ message: "not found invoice ", status: false });
    return await invoice.update(infoEdit);
  }
  async deleteById(id: number) {
    await this.invoiceRepository.destroy({ where: { id: id } });
    return true;
  }
}
