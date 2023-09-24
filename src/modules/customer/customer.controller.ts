import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { resposeSuccess } from "src/helpers/Response";
import { CustomerCreate } from "./dto/customer-create.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { CustomerEdit } from "./dto/customer-edit.dto";
import { Op } from "sequelize";

@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any, @Query("search") search: string, @Query("email") email: string) {
    const pagination = req.pagination;
    let filter = {};
    if (search) {
      filter["name"] = { [Op.substring]: search };
    }
    if (email) {
      //   filter["email"] = { [Op.substring]: email };
      filter["email"] = email;
    }
    console.log(filter["email"]);
    const data = await this.customerService.get(pagination, filter);
    return resposeSuccess(data);
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.customerService.getById(id);
    return resposeSuccess(data);
  }

  @Post()
  async create(@Body() promotionCreate: CustomerCreate) {
    const data = await this.customerService.create(promotionCreate);
    return resposeSuccess(data);
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() promotionEdit: CustomerEdit) {
    const data = await this.customerService.edit(id, promotionEdit);
    return resposeSuccess(data);
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.customerService.delete(id);
    return resposeSuccess();
  }
}
