import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import EmployeeUpdate from "./dto/employee-update.dto";

@Controller("employee")
@UseInterceptors(ClassSerializerInterceptor)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any) {
    const pagination = req.papagination;
    return await this.employeeService.get(pagination, {});
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    return await this.employeeService.getById(id);
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() editInfo: EmployeeUpdate) {
    return await this.employeeService.update(id, editInfo);
  }

  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    return await this.employeeService.deleteById(id);
  }
}
