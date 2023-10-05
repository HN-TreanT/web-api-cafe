import { Controller, Get, Post, Req, Query, Delete, Put, UseGuards, Param, Body } from "@nestjs/common";
import { DetailComboService } from "./detail-combo.service";
import { Op } from "sequelize";
import { PaginationGuard } from "src/guards/pagination.guard";

import { DetailComboCreate } from "./dto/detailcobom-create.dto";
import { DetailComboEdit } from "./dto/detailcombo-edit.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ROLES } from "src/constants/role.enum";
import { Roles } from "src/decorator/role.decorator";
@Controller("detail-combo")
export class DetailComboController {
  constructor(private readonly detailComboService: DetailComboService) {}
  @Get("/")
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(PaginationGuard, JwtAccessGuard, RolesGuard)
  async get(@Req() req: any) {
    const pagination = req.pagination;
    const data = await this.detailComboService.get(pagination, {});
    return data;
  }

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.detailComboService.getById(id);
    return data;
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() infoCreate: DetailComboCreate) {
    const data = await this.detailComboService.create(infoCreate);
    return data;
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: DetailComboEdit) {
    const data = await this.detailComboService.edit(id, infoEdit);
    return data;
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.detailComboService.deleteById(id);
    return true;
  }
}
