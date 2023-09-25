import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { TableFoodService } from "./table-food.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { resposeSuccess } from "src/helpers/Response";
import { TableFoodDto } from "./dto/table-food.dto";
import { Op } from "sequelize";

@Controller("table-food")
export class TableController {
  constructor(private readonly tableSerivce: TableFoodService) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any, @Query("search") search: string) {
    const pagination = req.pagination;
    const data = await this.tableSerivce.get(pagination, {
      name: { [Op.substring]: search },
    });
    return resposeSuccess(data);
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.tableSerivce.getById(id);
    return resposeSuccess(data);
  }

  @Post("")
  async create(@Body() createInfo: TableFoodDto) {
    const data = await this.tableSerivce.create(createInfo);
    return resposeSuccess(data);
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: TableFoodDto) {
    const data = await this.tableSerivce.update(id, editInfo);
    return resposeSuccess(data);
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.tableSerivce.deleteById(id);
    return resposeSuccess({});
  }
}
