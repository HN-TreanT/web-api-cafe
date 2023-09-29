import { Controller, Get, Req, Post, Put, Delete, Param, Body, UseGuards, Query, Search } from "@nestjs/common";
import { MaterialSerivce } from "./material.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { MaterialEdit } from "./dto/material-edit.dto";
import { MaterialCreate } from "./dto/material-create.dto";
import { MaterialOrder } from "./dto/material-order.dto";
@Controller("material")
export class MaterialController {
  constructor(private readonly materialService: MaterialSerivce) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any, @Query("search") search: string, @Query() order: MaterialOrder) {
    const pagination = req.pagination;
    const data = await this.materialService.get(pagination, search, order);
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.materialService.getById(id);
    return data;
  }

  @Post("")
  async create(@Body() infoCreate: MaterialCreate) {
    const data = await this.materialService.create(infoCreate);
    return data;
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: MaterialEdit) {
    const data = await this.materialService.edit(id, editInfo);
    return data;
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.materialService.delete(id);
    return true;
  }
}
