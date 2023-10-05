import { Controller, Get, Post, Put, Delete, UseGuards, Req, Body, Param, UseInterceptors, ClassSerializerInterceptor, Query } from "@nestjs/common";
import { CheckInventoryService } from "./check_inventory.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { CheckInventoryDto } from "./dto/check-invenoty-dto.dto";
import { CheckInventory } from "./check_inventory";
import { CheckInventoryFilter } from "./dto/check-iventory-filter.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";

@Controller("check-inventory")
export class CheckInventoryController {
  constructor(private readonly checkInventorySerivce: CheckInventoryService) {}
  @Roles(ROLES.ADMIN)
  @UseGuards(PaginationGuard, JwtAccessGuard, RolesGuard)
  @Get("/")
  async get(@Req() req: any, @Query() filter: CheckInventoryFilter) {
    const pagination = req.pagination;
    const data = await this.checkInventorySerivce.get(pagination, filter);
    // return data;
    return data;
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.checkInventorySerivce.getById(id);
    return data;
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() infoCreate: CheckInventoryDto) {
    const data = await this.checkInventorySerivce.create(infoCreate);
    return data;
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: CheckInventoryDto) {
    const data = await this.checkInventorySerivce.edit(id, infoEdit);
    return data;
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.checkInventorySerivce.delete(id);
    return true;
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/synchronized-warehouse/:id")
  async synchronizedWarehouse(@Param("id") id: number) {
    return await this.checkInventorySerivce.synchronizedWarehouse(id);
  }
}
