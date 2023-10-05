import { Controller, Get, Req, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { UseGuards } from "@nestjs/common";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Query } from "@nestjs/common";

import { Op } from "sequelize";
import { CategoryDto } from "./dto/category-dto.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get("/")
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(PaginationGuard, JwtAccessGuard, RolesGuard)
  async get(@Req() req: any, @Query("search") search: string) {
    const pagination = req.pagination;
    let filter = {};
    if (search) {
      filter["name"] = { [Op.substring]: search };
    }
    const data = await this.categoryService.get(pagination, filter);
    return data;
  }

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.categoryService.getById(id);
    return data;
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() infoCreate: CategoryDto) {
    const data = await this.categoryService.create(infoCreate);
    return data;
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: CategoryDto) {
    const data = await this.categoryService.edit(id, infoEdit);
    return data;
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.categoryService.deleteById(id);
    return true;
  }
}
