import { Controller, Get, Req, Post, Put, Delete, Param, Body, UseGuards, Query, Search } from "@nestjs/common";
import { MaterialSerivce } from "./material.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { MaterialEdit } from "./dto/material-edit.dto";
import { MaterialCreate } from "./dto/material-create.dto";
import { MaterialOrder } from "./dto/material-order.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('material')
@Controller("material")
export class MaterialController {
  constructor(private readonly materialService: MaterialSerivce) {}

  @ApiBearerAuth()
  @Get("/")
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async get(@Req() req: any, @Query("search") search: string, @Query() order: MaterialOrder) {
    const pagination = req.pagination;
    const data = await this.materialService.get(pagination, search, order);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.materialService.getById(id);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post("")
  async create(@Body() infoCreate: MaterialCreate) {
    const data = await this.materialService.create(infoCreate);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: MaterialEdit) {
    const data = await this.materialService.edit(id, editInfo);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.materialService.delete(id);
    return true;
  }
}
