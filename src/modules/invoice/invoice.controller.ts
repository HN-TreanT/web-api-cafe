import { resposeSuccess } from "src/helpers/Response";
import { InvoiceService } from "./invoice.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { InvoiceCreate } from "./dto/invoice-create.dto";
import { InoviceEdit } from "./dto/invoice-edit.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Transform } from "class-transformer";
import { Op } from "sequelize";
import { FilterDto } from "./dto/filter.dto";
import { OrderInvoiceDto } from "./dto/order.dto";

@Controller("invoice")
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any, @Query() filter: FilterDto, @Query() order: OrderInvoiceDto) {
    const pagination = req.pagination;
    const data = await this.invoiceService.get(pagination, filter, order);
    return resposeSuccess(data);
  }
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.invoiceService.getById(id);
    return resposeSuccess(data);
  }
  @Post()
  async create(@Body() createInfo: InvoiceCreate) {
    const data = await this.invoiceService.create(createInfo);
    return resposeSuccess(data);
  }
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() updateInfo: InoviceEdit) {
    const data = await this.invoiceService.edit(id, updateInfo);
    return resposeSuccess(data);
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.invoiceService.deleteById(id);
    return resposeSuccess();
  }
}
