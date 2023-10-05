import { InvoiceService } from "./invoice.service";
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { InvoiceCreate } from "./dto/invoice-create.dto";
import { InoviceEdit } from "./dto/invoice-edit.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Transform } from "class-transformer";
import { Op } from "sequelize";
import { FilterDto } from "./dto/filter.dto";
import { OrderInvoiceDto } from "./dto/order.dto";
import { SplitInvoice } from "./dto/split-invoice.dto";
import { CombineInvoice } from "./dto/combine-invoice.dto";
import { Payment } from "./dto/payment.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { ROLES } from "src/constants/role.enum";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";

@Controller("invoice")
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(PaginationGuard, JwtAccessGuard, RolesGuard)
  @Get("/")
  async get(@Req() req: any, @Query() filter: FilterDto, @Query() order: OrderInvoiceDto) {
    const pagination = req.pagination;
    const data = await this.invoiceService.get(pagination, filter, order);
    return data;
  }

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.invoiceService.getById(id);
    return data;
  }

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() createInfo: InvoiceCreate) {
    const data = await this.invoiceService.create(createInfo);
    return data;
  }

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() updateInfo: InoviceEdit) {
    const data = await this.invoiceService.edit(id, updateInfo);
    return data;
  }

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.invoiceService.deleteById(id);
    return true;
  }

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post("/split-order")
  async splitOrder(@Body() splitInvoice: SplitInvoice) {
    return await this.invoiceService.splitInvoice(splitInvoice);
  }

  @UseGuards(JwtAccessGuard)
  @Post("/combine-inovice")
  async combineInvoice(@Query("isCombineTable") isCombineTable: boolean, @Body() combineInvoice: CombineInvoice) {
    let check: boolean = false;
    if (isCombineTable) {
      check = isCombineTable;
    }
    return await this.invoiceService.combineInvocie(check, combineInvoice);
  }

  @UseGuards(JwtAccessGuard)
  @Post("/payment/:invoice_id")
  async payment(@Param("invoice_id") invoice_id: number, @Body() paymentInfo: Payment) {
    console.log(invoice_id);
    return await this.invoiceService.payment(invoice_id, paymentInfo);
  }

  @UseGuards(JwtAccessGuard)
  @Get("/complete-invoice/:id")
  async test(@Param("id") id: number) {
    const data = await this.invoiceService.completeInvocie(id);
    return data;
  }
}
