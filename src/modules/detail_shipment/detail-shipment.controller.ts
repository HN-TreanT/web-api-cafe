import { Controller, Get, Post, Delete, Put, Req, Body, Param, Query, UseGuards } from "@nestjs/common";
import { DetailShipmentService } from "./detail-shipment.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { resposeSuccess } from "src/helpers/Response";
import { DetailShipmentCreate } from "./dto/detail-shipment-create.dto";
import { DetailShipmentEdit } from "./dto/detail-shipment-edit";
import { DetailShipmentFilter } from "./dto/detail-shipment-filter";
import { query } from "express";
import { DetailShipmentOrder } from "./dto/detail-shipment-order";
@Controller("detail-shipment")
export class DetailShipmentController {
  constructor(private readonly detailShipmentService: DetailShipmentService) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any, @Query() filter: DetailShipmentFilter, @Query() order: DetailShipmentOrder) {
    const pagination = req.pagination;
    const data = await this.detailShipmentService.get(pagination, filter, order);
    return resposeSuccess(data);
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.detailShipmentService.getById(id);
    return resposeSuccess(data);
  }

  @Post()
  async create(@Body() infoCreate: DetailShipmentCreate) {
    const data = await this.detailShipmentService.create(infoCreate);
    return resposeSuccess(data);
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: DetailShipmentEdit) {
    const data = await this.detailShipmentService.edit(id, infoEdit);
    return resposeSuccess(data);
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.detailShipmentService.delete(id);
    return resposeSuccess();
  }
}
