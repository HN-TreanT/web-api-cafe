import { Controller, Get, Post, Req, Query, Delete, Put, UseGuards, Param, Body } from "@nestjs/common";
import { DetailComboService } from "./detail-combo.service";
import { Op } from "sequelize";
import { PaginationGuard } from "src/guards/pagination.guard";
import { resposeSuccess } from "src/helpers/Response";
import { DetailComboCreate } from "./dto/detailcobom-create.dto";
import { DetailComboEdit } from "./dto/detailcombo-edit.dto";
@Controller("detail-combo")
export class DetailComboController {
  constructor(private readonly detailComboService: DetailComboService) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any) {
    const pagination = req.pagination;
    const data = await this.detailComboService.get(pagination, {});
    return resposeSuccess(data);
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.detailComboService.getById(id);
    return resposeSuccess(data);
  }

  @Post()
  async create(@Body() infoCreate: DetailComboCreate) {
    const data = await this.detailComboService.create(infoCreate);
    return resposeSuccess(data);
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: DetailComboEdit) {
    const data = await this.detailComboService.edit(id, infoEdit);
    return resposeSuccess(data);
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.detailComboService.deleteById(id);
    return resposeSuccess();
  }
}
