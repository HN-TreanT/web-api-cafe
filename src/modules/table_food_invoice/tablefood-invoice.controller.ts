import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { TablefoodInoviceService } from "./tablefood-invoice.service";

import { TblInvoiceCreate } from "./dto/tbf-invoice-create";
import { TblInvoiceEdit } from "./dto/tbl-inovice-edit.dto";
import { PaginationGuard } from "src/guards/pagination.guard";

@Controller("tablefood-invoice")
export class TablefoodInoviceController {
  constructor(private readonly tablefoodInvoiceSerivce: TablefoodInoviceService) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any) {
    const pagination = req.pagination;
    const data = await this.tablefoodInvoiceSerivce.get(pagination, {});
    return data;
  }
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.tablefoodInvoiceSerivce.getById(id);
    return data;
  }
  @Post()
  async create(@Body() createInfo: TblInvoiceCreate) {
    const data = await this.tablefoodInvoiceSerivce.create(createInfo);
    return data;
  }
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() updateInfo: TblInvoiceEdit) {
    const data = await this.tablefoodInvoiceSerivce.edit(id, updateInfo);
    return data;
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.tablefoodInvoiceSerivce.deleteById(id);
    return true;
  }
}
