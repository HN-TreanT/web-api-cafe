import { Body, Controller, Delete, Get, Inject, Param, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import EmployeeUpdate from "./dto/employee-update.dto";
import { resposeSuccess } from "src/helpers/Response";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any) {
    const pagination = req.pagination;
    const data = await this.employeeService.get(pagination, {});
    return resposeSuccess(data);
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.employeeService.getById(id);
    return resposeSuccess(data);
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: EmployeeUpdate) {
    const data = await this.employeeService.update(id, editInfo);
    return resposeSuccess(data);
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.employeeService.deleteById(id);
    return resposeSuccess({});
  }
}
