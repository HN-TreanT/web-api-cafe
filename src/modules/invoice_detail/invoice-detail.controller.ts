import { Controller, Get, Post, Put, Delete, UseGuards, Query, Param, Body, Req } from "@nestjs/common";
import { InvoiceDetailService } from "./invoice-detail.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Op } from "sequelize";
import { InvoiceDetailCreate } from "./dto/invoice-detail-create";
import { InvoiceDetailEdit } from "./dto/invoice-detail-edit";
import { DtInvoiceFilter } from "./dto/dt-invoice-filter";
@Controller("invoice-detail")
export class InvoiceDetailController {
  constructor(private readonly invoiceDetailService: InvoiceDetailService) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any, @Query() filter: DtInvoiceFilter) {
    const pagination = req.pagination;
    const data = await this.invoiceDetailService.get(pagination, filter);
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.invoiceDetailService.getById(id);
    return data;
  }

  @Post()
  async create(@Body() infoCreate: InvoiceDetailCreate) {
    const data = await this.invoiceDetailService.create(infoCreate);
    return data;
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: InvoiceDetailEdit) {
    const data = await this.invoiceDetailService.edit(id, infoEdit);
    return data;
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.invoiceDetailService.deleteById(id);
    return true;
  }
}
