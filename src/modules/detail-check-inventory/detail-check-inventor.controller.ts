import { Controller, Get, Post, Put, Delete, Req, Body, Param, UseGuards, Query } from "@nestjs/common";
import { DtCheckInventorService } from "./detail-check-inventor.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { DTCheckInventoryCreate } from "./dto/dt-check-inventory-create.dto";
import { DTCheckInventoryEdit } from "./dto/dt-check-inventory-edit";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('detail-check-inventor')
@Controller("detail-check-inventor")
export class DetailCheckInventorContronller {
  constructor(private readonly _serivce: DtCheckInventorService) {}

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/")
  async get(@Req() req: any, @Query("id_detail_check") id_detail_check: number) {
    const pagination = req.pagination;

    const data = await this._serivce.get(pagination, {
      id_detail_check: id_detail_check,
    });
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this._serivce.getById(id);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() infoCreate: DTCheckInventoryCreate) {
    const data = await this._serivce.create(infoCreate);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: DTCheckInventoryEdit) {
    const data = await this._serivce.edit(id, infoEdit);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this._serivce.deleteById(id);
    return true;
  }
}
