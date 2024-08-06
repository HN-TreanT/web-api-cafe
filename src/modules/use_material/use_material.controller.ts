import { Controller, Get, Post, Put, Delete, UseGuards, Req, Body, Param } from "@nestjs/common";
import { UseMaterialService } from "./use_material.service";
import { PaginationGuard } from "src/guards/pagination.guard";

import { MaterialCreate } from "../material/dto/material-create.dto";
import { UseMaterialCreate } from "./dto/use-material-create.dto";
import { UseMaterialEdit } from "./dto/use-material-edit.dto";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('use-material')
@Controller("use-material")
export class UseMaterialController {
  constructor(private readonly useMaterialService: UseMaterialService) {}

  @ApiBearerAuth()
  @Get("/")
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async get(@Req() req: any) {
    const pagination = req.pagination;
    const data = await this.useMaterialService.get(pagination, {});
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.useMaterialService.getById(id);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() createInfo: UseMaterialCreate) {
    const data = await this.useMaterialService.create(createInfo);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post("/createMany")
  async createMany(@Body() createInfo: UseMaterialCreate[]) {
    const data = await this.useMaterialService.createMany(createInfo);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() updateInfo: UseMaterialEdit) {
    const data = await this.useMaterialService.edit(id, updateInfo);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.useMaterialService.deleteById(id);
    return true;
  }


}
