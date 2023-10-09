import { Body, Controller, Delete, Get, Inject, Param, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import EmployeeUpdate from "./dto/employee-update.dto";
import { EmployeeFilter } from "./dto/employee-filter.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { ROLES } from "src/constants/role.enum";
import { Roles } from "src/decorator/role.decorator";
import { RolesGuard } from "src/guards/role.guard";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/")
  async get(@Req() req: any, @Query() filter: EmployeeFilter) {
    const pagination = req.pagination;
    const data = await this.employeeService.get(pagination, filter);
    return data;
  }

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.employeeService.getById(id);
    return data;
  }

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: EmployeeUpdate) {
    const data = await this.employeeService.update(id, editInfo);
    return data;
  }

  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.employeeService.deleteById(id);
    return true;
  }
}
