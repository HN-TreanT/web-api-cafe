import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { INVOICE_DETAIL_REPOSITORY } from "src/constants/repository_enum";
import { InvoiceDetail } from "./invoice_detail.entity";
import { PagedData } from "src/models/PagedData";
import { Combo } from "../combo/combo.entity";
import { Product } from "../product/product.entity";
import { InvoiceDetailCreate } from "./dto/invoice-detail-create";
import { InvoiceDetailEdit } from "./dto/invoice-detail-edit";
import { DtInvoiceFilter } from "./dto/dt-invoice-filter";

@Injectable()
export class InvoiceDetailService {
  constructor(@Inject(INVOICE_DETAIL_REPOSITORY) private readonly invoiceDetailRepository: typeof InvoiceDetail) {}

  async get(pagination: any, filter: DtInvoiceFilter): Promise<PagedData<InvoiceDetail>> {
    const { count, rows } = await this.invoiceDetailRepository.findAndCountAll({
      where: { ...filter },
      ...pagination,
      include: [
        {
          model: Combo,
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

  async getById(id: number): Promise<InvoiceDetail> {
    const invoice_detail = await this.invoiceDetailRepository.findByPk(id);
    if (!invoice_detail) throw new NotFoundException({ message: "not found invoice detail", status: false });
    return invoice_detail;
  }

  async create(infoCreate: InvoiceDetailCreate): Promise<InvoiceDetail> {
    return await this.invoiceDetailRepository.create(infoCreate);
  }

  async edit(id: number, infoEdit: InvoiceDetailEdit): Promise<InvoiceDetail> {
    const invoice_detail = await this.invoiceDetailRepository.findByPk(id);
    if (!invoice_detail) throw new NotFoundException({ message: "not found invoice detail", status: false });
    return invoice_detail.update(infoEdit);
  }

  async deleteById(id: number) {
    const invoice_detail = await this.invoiceDetailRepository.findByPk(id);
    if (!invoice_detail) throw new NotFoundException({ message: "not found invoice detail", status: false });
    return invoice_detail.destroy();
  }
}
