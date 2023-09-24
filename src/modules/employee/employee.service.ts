import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { EMPLOYEE_REPOSITORY } from "src/constants/repository_enum";
import { Employee } from "./employee.entity";
import EmployeeUpdate from "./dto/employee-update.dto";
import { PagedData } from "src/models/PagedData";
import { EmployeeWorkShift } from "../employee_workshift/employee_workshift.entity";
import { Workshift } from "../workshift/workshift.entity";
import { Position } from "../position/position.entity";
import { EmployeeWorkShiftService } from "../employee_workshift/employee_workshift.service";

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY) private readonly employeeRepository: typeof Employee,
    private readonly employeeWorkshiftService: EmployeeWorkShiftService
  ) {}

  async get(pagination: any, filter: any): Promise<PagedData<Employee>> {
    const { count, rows } = await this.employeeRepository.findAndCountAll({
      attributes: {
        exclude: ["password"],
      },
      where: { ...filter },
      ...pagination,
      include: [
        {
          model: Position,
        },
        {
          model: EmployeeWorkShift,
          include: [Workshift],
        },
      ],
    });

    const pageNumber = pagination.offset / pagination.limit + 1;
    const data = {
      CurrentPage: pageNumber,
      TotalPage: count,
      CanNext: pageNumber < count,
      CanBack: pageNumber > 1,
      data: rows,
    };

    return data;
  }
  async getById(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findByPk<Employee>(id, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Position,
        },
        {
          model: EmployeeWorkShift,
          include: [Workshift],
        },
      ],
    });
    if (!employee) throw new NotFoundException("not found employee");
    return employee;
  }
  async update(id: number, employeeUpdate: EmployeeUpdate): Promise<Employee> {
    const employee = await this.employeeRepository.findByPk(id);
    if (!employee) throw new NotFoundException("not found employee");
    await this.employeeWorkshiftService.deleteMany(id);
    await this.employeeWorkshiftService.createMany(employeeUpdate.employee_worshift);
    return await employee.update(employeeUpdate);
  }
  async deleteById(id: number) {
    const employee = await this.employeeRepository.findByPk(id);
    if (!employee) throw new NotFoundException("not found employee");
    await this.employeeWorkshiftService.deleteMany(id);
    await employee.destroy();
    return true;
  }
}
