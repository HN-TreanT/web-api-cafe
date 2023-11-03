import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { TableFoodService } from "./table-food.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { TableFoodDto } from "./dto/table-food.dto";
import { Op } from "sequelize";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { ApiTags , ApiBearerAuth} from "@nestjs/swagger";

@ApiTags('table-food')
@Controller("table-food")
export class TableController {
  constructor(private readonly tableSerivce: TableFoodService) {}

  @ApiBearerAuth()
  @Get("/")
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async get(@Req() req: any, @Query("search") search: string, @Query("status") status: number) {
    let filter: any = {};
    if (search) filter.name = { [Op.substring]: search };
    if (!Number.isNaN(status)) filter.status = status;
    const pagination = req.pagination;
    const data = await this.tableSerivce.get(pagination, filter);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.tableSerivce.getById(id);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post("")
  async create(@Body() createInfo: TableFoodDto) {
    const data = await this.tableSerivce.create(createInfo);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: TableFoodDto) {
    const data = await this.tableSerivce.update(id, editInfo);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.tableSerivce.deleteById(id);
    return true;
  }
}
