import { Controller, Get, UseGuards, Post, Req, Query, Param, Body, Put, Delete } from "@nestjs/common";
import { SupplierSerivce } from "./supplier.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { SupplierCreate } from "./dto/supplier-create.dto";
import { SupplierEdit } from "./dto/supplier-edit.dto";

@Controller("supplier")
export class SupplierController {
  constructor(private readonly supplierService: SupplierSerivce) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any, @Query("search") search: string) {
    const pagination = req.pagination;
    const data = await this.supplierService.get(pagination, search);
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.supplierService.getById(id);
    return data;
  }

  @Post()
  async create(@Body() infoCreate: SupplierCreate) {
    const data = await this.supplierService.create(infoCreate);
    return data;
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: SupplierEdit) {
    const data = await this.supplierService.edit(id, infoEdit);
    return data;
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.supplierService.deleteById(id);
    return true;
  }
}
