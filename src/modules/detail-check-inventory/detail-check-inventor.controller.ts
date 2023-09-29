import { Controller, Get, Post, Put, Delete, Req, Body, Param, UseGuards, Query } from "@nestjs/common";
import { DtCheckInventorService } from "./detail-check-inventor.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { DTCheckInventoryCreate } from "./dto/dt-check-inventory-create.dto";
import { DTCheckInventoryEdit } from "./dto/dt-check-inventory-edit";

@Controller("detail-check-inventor")
export class DetailCheckInventorContronller {
  constructor(private readonly _serivce: DtCheckInventorService) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any, @Query("id_detail_check") id_detail_check: number) {
    const pagination = req.pagination;

    const data = await this._serivce.get(pagination, {
      id_detail_check: id_detail_check,
    });
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this._serivce.getById(id);
    return data;
  }

  @Post()
  async create(@Body() infoCreate: DTCheckInventoryCreate) {
    const data = await this._serivce.create(infoCreate);
    return data;
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: DTCheckInventoryEdit) {
    const data = await this._serivce.edit(id, infoEdit);
    return data;
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this._serivce.deleteById(id);
    return true;
  }
}
