import { Controller, Get, Post, Put, Delete, UseGuards, Query, Param, Body, Req } from "@nestjs/common";
import { InvoiceDetailService } from "./invoice-detail.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Op } from "sequelize";
import { InvoiceDetailCreate } from "./dto/invoice-detail-create";
import { InvoiceDetailEdit } from "./dto/invoice-detail-edit";
import { DtInvoiceFilter } from "./dto/dt-invoice-filter";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ROLES } from "src/constants/role.enum";
import { Roles } from "src/decorator/role.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('invoice-detail')
@Controller("invoice-detail")
export class InvoiceDetailController {
  constructor(private readonly invoiceDetailService: InvoiceDetailService) {}

  @ApiBearerAuth()
  @Get("/")
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async get(@Req() req: any, @Query() filter: DtInvoiceFilter) {
    const pagination = req.pagination;
    const data = await this.invoiceDetailService.get(pagination, filter);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.invoiceDetailService.getById(id);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() infoCreate: InvoiceDetailCreate) {
    const data = await this.invoiceDetailService.create(infoCreate);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: InvoiceDetailEdit) {
    const data = await this.invoiceDetailService.edit(id, infoEdit);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.invoiceDetailService.deleteById(id);
    return true;
  }
}
