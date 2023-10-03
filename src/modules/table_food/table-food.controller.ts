import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { TableFoodService } from "./table-food.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { TableFoodDto } from "./dto/table-food.dto";
import { Op } from "sequelize";

@Controller("table-food")
export class TableController {
  constructor(private readonly tableSerivce: TableFoodService) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any, @Query("search") search: string, @Query("status") status: number) {
    let filter: any = {};
    if (search) filter.name = { [Op.substring]: search };
    if (!Number.isNaN(status)) filter.status = status;
    const pagination = req.pagination;
    const data = await this.tableSerivce.get(pagination, filter);
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.tableSerivce.getById(id);
    return data;
  }

  @Post("")
  async create(@Body() createInfo: TableFoodDto) {
    const data = await this.tableSerivce.create(createInfo);
    return data;
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: TableFoodDto) {
    const data = await this.tableSerivce.update(id, editInfo);
    return data;
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.tableSerivce.deleteById(id);
    return true;
  }
}
