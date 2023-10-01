import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { EMPLOYEE_WORKSHIFT_REPOSITORY } from "src/constants/repository_enum";
import { EmployeeWorkShift } from "./employee_workshift.entity";
import { EmployeeWfCreate } from "./dto/employee-workshift-create.dto";
import { Worker } from "cluster";

@Injectable()
export class EmployeeWorkShiftService {
  constructor(@Inject(EMPLOYEE_WORKSHIFT_REPOSITORY) private readonly _repository: typeof EmployeeWorkShift) {}
  async get(pagination: any, filter: any) {
    const { count, rows } = await this._repository.findAndCountAll({
      where: { ...filter },
      ...pagination,
    });
    return {
      count: count,
      data: rows,
    };
  }

  async createMany(infoCreate: EmployeeWfCreate[]) {
    return await this._repository.bulkCreate(infoCreate);
  }

  async update(id: number, infoUpdate: EmployeeWfCreate) {
    const record = await this._repository.findByPk(id);
    if (!record) throw new NotFoundException("not found ");
    return record.update(infoUpdate);
  }

  async deleteById(id: number) {
    const record = await this._repository.findByPk(id);
    if (!record) throw new NotFoundException("not found ");
    await record.destroy();
    return true;
  }

  async deleteMany(id_employee: number) {
    await this._repository.destroy({
      where: { id_employee: id_employee },
    });
    return true;
  }
}
