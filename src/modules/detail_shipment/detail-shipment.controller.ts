import { Controller, Get, Post, Delete, Put, Req, Body, Param, Query, UseGuards } from "@nestjs/common";
import { DetailShipmentService } from "./detail-shipment.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { DetailShipmentCreate } from "./dto/detail-shipment-create.dto";
import { DetailShipmentEdit } from "./dto/detail-shipment-edit";
import { DetailShipmentFilter } from "./dto/detail-shipment-filter";
import { query } from "express";
import { DetailShipmentOrder } from "./dto/detail-shipment-order";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('detail-shipment')
@Controller("detail-shipment")
export class DetailShipmentController {
  constructor(private readonly detailShipmentService: DetailShipmentService) {}

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/")
  async get(@Req() req: any, @Query() filter: DetailShipmentFilter, @Query() order: DetailShipmentOrder) {
    const pagination = req.pagination;
    const data = await this.detailShipmentService.get(pagination, filter, order);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.detailShipmentService.getById(id);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() infoCreate: DetailShipmentCreate) {
    const data = await this.detailShipmentService.create(infoCreate);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: DetailShipmentEdit) {
    const data = await this.detailShipmentService.edit(id, infoEdit);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.detailShipmentService.delete(id);
    return true;
  }
}
