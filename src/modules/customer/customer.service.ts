import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CUSTOMER_REPOSITORY } from "src/constants/repository_enum";
import { Customer } from "./customer.entity";
import { PagedData } from "src/models/PagedData";
import { CustomerCreate } from "./dto/customer-create.dto";
import { CustomerEdit } from "./dto/customer-edit.dto";
@Injectable()
export class CustomerService {
  constructor(@Inject(CUSTOMER_REPOSITORY) private readonly customerRepository: typeof Customer) {}
  async get(pagination: any, filter: any): Promise<PagedData<Customer>> {
    const { count, rows } = await this.customerRepository.findAndCountAll({
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

  async getById(id: number): Promise<Customer> {
    const promotion = await this.customerRepository.findByPk(id, {});
    if (!promotion) throw new NotFoundException({ message: "not found customer", status: false });
    return promotion;
  }

  async create(promotionCreate: CustomerCreate): Promise<Customer> {
    return await this.customerRepository.create(promotionCreate);
  }

  async edit(id: number, promotionEdit: CustomerEdit): Promise<Customer> {
    const promotion = await this.customerRepository.findByPk(id);
    if (!promotion) throw new NotFoundException({ message: "not found promotion", status: false });
    return promotion.update(promotionEdit);
  }
  async delete(id: number) {
    const promotion = await this.customerRepository.findByPk(id);
    if (!promotion) throw new NotFoundException({ message: "not found promotion", status: false });
    await promotion.destroy();
    return true;
  }
}
