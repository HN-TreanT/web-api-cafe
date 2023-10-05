import { Controller, Get, Post, Put, Delete, UseGuards, Req, Body, Param, UseInterceptors, ClassSerializerInterceptor, Query } from "@nestjs/common";
import { CheckInventoryService } from "./check_inventory.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { CheckInventoryDto } from "./dto/check-invenoty-dto.dto";
import { CheckInventory } from "./check_inventory";
import { CheckInventoryFilter } from "./dto/check-iventory-filter.dto";

@Controller("check-inventory")
export class CheckInventoryController {
  constructor(private readonly checkInventorySerivce: CheckInventoryService) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any, @Query() filter: CheckInventoryFilter) {
    const pagination = req.pagination;
    const data = await this.checkInventorySerivce.get(pagination, filter);
    // return data;
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.checkInventorySerivce.getById(id);
    return data;
  }

  @Post()
  async create(@Body() infoCreate: CheckInventoryDto) {
    const data = await this.checkInventorySerivce.create(infoCreate);
    return data;
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: CheckInventoryDto) {
    const data = await this.checkInventorySerivce.edit(id, infoEdit);
    return data;
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.checkInventorySerivce.delete(id);
    return true;
  }

  @Get("/synchronized-warehouse/:id")
  async synchronizedWarehouse(@Param("id") id: number) {
    return await this.checkInventorySerivce.synchronizedWarehouse(id);
  }
}
