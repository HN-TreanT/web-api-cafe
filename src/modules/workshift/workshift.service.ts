import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WORKSHIFT_REPOSITORY } from "src/constants/repository_enum";
import { Workshift } from "./workshift.entity";
import { WorkshiftCreate } from "./dto/workshift-create.dto";
import { Worker } from "cluster";
import { EmployeeWorkShiftService } from "../employee_workshift/employee_workshift.service";

@Injectable()
export class WorkshiftServices {
  constructor(
    @Inject(WORKSHIFT_REPOSITORY) private readonly workshiftRepository: typeof Workshift,
    private readonly employeeWorkshiftService: EmployeeWorkShiftService
  ) {}
  async get(filter: any) {
    const { count, rows } = await this.workshiftRepository.findAndCountAll({
      where: { ...filter },
    });
    return {
      count: count,
      data: rows,
    };
  }

  async getById(id: number): Promise<Workshift> {
    const workshift = await this.workshiftRepository.findByPk(id);
    if (!workshift) throw new NotFoundException({ message: "not found workshift", status: false });
    return workshift;
  }

  async create(infoCreate: WorkshiftCreate): Promise<Workshift> {
    return await this.workshiftRepository.create(infoCreate);
  }
  async edit(id: number, infoUpdate: WorkshiftCreate): Promise<Workshift> {
    const workshift = await this.workshiftRepository.findByPk(id);
    if (!workshift) throw new NotFoundException({ message: "not found workshift", status: false });
    return await workshift.update(infoUpdate);
  }

  async delete(id: number) {
    const workshift = await this.workshiftRepository.findByPk(id);
    if (!workshift) throw new NotFoundException({ message: "not found workshift", status: false });
    // await this.employeeWorkshiftService.deleteMany(id);
    await workshift.destroy();
    return true;
  }
}
