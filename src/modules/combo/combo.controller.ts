import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { ComboService } from "./combo.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { Op } from "sequelize";

import { ComboCreate } from "./dto/combo-create.dto";
import { ComboEdit } from "./dto/combo-edit.dto";
import { CheckValidMaterial } from "./dto/check-valid-material.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('combo')
@Controller("combo")
export class ComboController {
  constructor(private readonly comboService: ComboService) {}

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/")
  async get(@Req() req: any, @Query("search") search: string) {
    const pagination = req.pagination;
    let filter = {};
    if (search) {
      filter["name"] = { [Op.substring]: search };
    }
    console.log(filter["email"]);
    const data = await this.comboService.get(pagination, filter);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.comboService.getById(id);
    return data;
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() infoCreate: ComboCreate) {
    const data = await this.comboService.create(infoCreate);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: ComboEdit) {
    const data = await this.comboService.edit(id, infoEdit);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.comboService.deleteById(id);
    return true;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post("/check-valid-material")
  async checkValidMaterial(@Body() info: CheckValidMaterial) {
    return await this.comboService.checkValidMaterial(info.id_combo, info.amount);
  }
}
