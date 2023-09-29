import { Controller, Get, Req, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { UseGuards } from "@nestjs/common";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Query } from "@nestjs/common";

import { Op } from "sequelize";
import { CategoryDto } from "./dto/category-dto.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any, @Query("search") search: string) {
    const pagination = req.pagination;
    let filter = {};
    if (search) {
      filter["name"] = { [Op.substring]: search };
    }
    const data = await this.categoryService.get(pagination, filter);
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.categoryService.getById(id);
    return data;
  }

  @Post()
  async create(@Body() infoCreate: CategoryDto) {
    const data = await this.categoryService.create(infoCreate);
    return data;
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: CategoryDto) {
    const data = await this.categoryService.edit(id, infoEdit);
    return data;
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.categoryService.deleteById(id);
    return true;
  }
}
