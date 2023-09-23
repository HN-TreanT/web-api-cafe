import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { EMPLOYEE_REPOSITORY } from "src/constants/repository_enum";
import { Employee } from "./employee.entity";
import EmployeeUpdate from "./dto/employee-update.dto";
import { Paging } from "src/common/paging";
import { PagedData } from "src/models/PagedData";

@Injectable()
export class EmployeeService {
  constructor(@Inject(EMPLOYEE_REPOSITORY) private readonly employeeRepository: typeof Employee) {}

  async get(paging: Paging, filter: any): Promise<PagedData<Employee>> {
    const { count, rows } = await this.employeeRepository.findAndCountAll({
      where: { ...filter },
      ...paging,
    });
    const data = new PagedData<Employee>(paging.pageNumber, count, rows);
    return data;
  }
  async getById(id: number): Promise<Employee> {
    return await this.employeeRepository.findByPk<Employee>(id);
  }
  async update(id: number, employeeUpdate: EmployeeUpdate): Promise<Employee> {
    const employee = await this.employeeRepository.findByPk(id);
    if (!employee) throw new NotFoundException("not found employee");
    return await employee.update(employeeUpdate);
  }
  async deleteById(id: number) {
    const employee = await this.employeeRepository.findByPk(id);
    if (!employee) throw new NotFoundException("not found employee");
    await employee.destroy();
    return true;
  }
}
