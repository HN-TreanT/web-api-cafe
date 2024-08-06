import { Inject, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { EMPLOYEE_REPOSITORY, EMPLOYEE_WORKSHIFT_REPOSITORY } from "src/constants/repository_enum";
import { Employee } from "./employee.entity";
import EmployeeUpdate from "./dto/employee-update.dto";
import { PagedData } from "src/models/PagedData";
import { EmployeeWorkShift } from "../employee_workshift/employee_workshift.entity";
import { Workshift } from "../workshift/workshift.entity";
import { Position } from "../position/position.entity";
import { EmployeeWorkShiftService } from "../employee_workshift/employee_workshift.service";
import { EmployeeFilter } from "./dto/employee-filter.dto";
import { Op } from "sequelize";
import EmployeeCreate from "./dto/employee-create.dto";
import * as bcrypt from "bcrypt";
@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY) private readonly employeeRepository: typeof Employee,

    private readonly employeeWorkshiftService: EmployeeWorkShiftService
    
  ) {}

  async get(pagination: any, filter: EmployeeFilter): Promise<PagedData<Employee>> {
    let filterData: any = {};
    if (filter.search) {
      filterData[Op.or] = {
        name: { [Op.substring]: filter.search },
        email: filter.search,
        phone_number: filter.search,
        address: { [Op.substring]: filter.search },
      };
    }
    if (filter.id_position) {
      filterData.id_position = filter.id_position;
    }
    const { count, rows } = await this.employeeRepository.findAndCountAll({
      attributes: {
        exclude: ["password"],
      },
      where: { ...filterData },
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
    const total = await this.employeeRepository.count({ where: { ...filterData } });
    const pageNumber = pagination.offset / pagination.limit + 1;
    const data = {
      CurrentPage: pageNumber,
      TotalPage: total,
      CanNext: pageNumber < total,
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
  async create(employeeCreate: EmployeeCreate): Promise<Employee> {
    
   try {
      
        if(employeeCreate.password) {
          const hashPassword = await bcrypt.hash(employeeCreate.password, 10);
          employeeCreate.password = hashPassword
        }
        const employee = await this.employeeRepository.create(employeeCreate)
        if (employeeCreate.employee_worshift) {
          const temp = employeeCreate.employee_worshift.map((item) => {
            return {
              id_employee: employee.id,
              id_workshift: item
            }
          })
            await this.employeeWorkshiftService.createMany(temp)
        }
        return employee
   

   } catch (err: any) {
      console.log(err)
       throw new  BadRequestException(err)
   }
  
  }
  async update(id: number, employeeUpdate: EmployeeUpdate): Promise<Employee> {
    const employee = await this.employeeRepository.findByPk(id);
    if (!employee) throw new NotFoundException("not found employee");
    if (employeeUpdate.employee_worshift) {
      await this.employeeWorkshiftService.deleteMany(id);
      await this.employeeWorkshiftService.createMany(employeeUpdate.employee_worshift);
    }

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
