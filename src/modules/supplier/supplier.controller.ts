import { Controller, Get, UseGuards, Post, Req, Query, Param, Body, Put, Delete } from "@nestjs/common";
import { SupplierSerivce } from "./supplier.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { SupplierCreate } from "./dto/supplier-create.dto";
import { SupplierEdit } from "./dto/supplier-edit.dto";
import { ROLES } from "src/constants/role.enum";
import { Roles } from "src/decorator/role.decorator";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('supplier')
@Controller("supplier")
export class SupplierController {
  constructor(private readonly supplierService: SupplierSerivce) {}

  @ApiBearerAuth()
  @Get("/")
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async get(@Req() req: any, @Query("search") search: string) {
    const pagination = req.pagination;
    const data = await this.supplierService.get(pagination, search);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.supplierService.getById(id);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() infoCreate: SupplierCreate) {
    const data = await this.supplierService.create(infoCreate);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: SupplierEdit) {
    const data = await this.supplierService.edit(id, infoEdit);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.supplierService.deleteById(id);
    return true;
  }
}
