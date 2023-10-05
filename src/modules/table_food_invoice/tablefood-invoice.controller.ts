import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { TablefoodInoviceService } from "./tablefood-invoice.service";

import { TblInvoiceCreate } from "./dto/tbf-invoice-create";
import { TblInvoiceEdit } from "./dto/tbl-inovice-edit.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { ROLES } from "src/constants/role.enum";
import { Roles } from "src/decorator/role.decorator";
import { RolesGuard } from "src/guards/role.guard";

@Controller("tablefood-invoice")
export class TablefoodInoviceController {
  constructor(private readonly tablefoodInvoiceSerivce: TablefoodInoviceService) {}
  @Get("/")
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(PaginationGuard, JwtAccessGuard, RolesGuard)
  async get(@Req() req: any) {
    const pagination = req.pagination;
    const data = await this.tablefoodInvoiceSerivce.get(pagination, {});
    return data;
  }
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.tablefoodInvoiceSerivce.getById(id);
    return data;
  }
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(PaginationGuard, JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() createInfo: TblInvoiceCreate) {
    const data = await this.tablefoodInvoiceSerivce.create(createInfo);
    return data;
  }

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(PaginationGuard, JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() updateInfo: TblInvoiceEdit) {
    const data = await this.tablefoodInvoiceSerivce.edit(id, updateInfo);
    return data;
  }

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(PaginationGuard, JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.tablefoodInvoiceSerivce.deleteById(id);
    return true;
  }
}
