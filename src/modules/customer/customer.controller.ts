import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { CustomerService } from "./customer.service";

import { CustomerCreate } from "./dto/customer-create.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { CustomerEdit } from "./dto/customer-edit.dto";
import { Op } from "sequelize";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ROLES } from "src/constants/role.enum";
import { Roles } from "src/decorator/role.decorator";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('customer')
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/")
  async get(@Req() req: any, @Query("search") search: string, @Query("email") email: string) {
    const pagination = req.pagination;
    let filter = {};
    if (search) {
      filter["name"] = { [Op.substring]: search };
    }
    if (email) {
      //   filter["email"] = { [Op.substring]: email };
      filter["email"] = email;
    }
    const data = await this.customerService.get(pagination, filter);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.customerService.getById(id);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() promotionCreate: CustomerCreate) {
    const data = await this.customerService.create(promotionCreate);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() promotionEdit: CustomerEdit) {
    const data = await this.customerService.edit(id, promotionEdit);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.customerService.delete(id);
    return true;
  }
}
