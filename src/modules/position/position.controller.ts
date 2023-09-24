import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, UseInterceptors } from "@nestjs/common";
import { POSITION_REPOSITORY } from "src/constants/repository_enum";
import { Position } from "./position.entity";
import { PositionCreate } from "./dto/position-create.dto";
import { Employee } from "../employee/employee.entity";

@Controller("position")
export class PositionController {
  constructor(@Inject(POSITION_REPOSITORY) private readonly positionRepository: typeof Position) {}
  @Post()
  async create(@Body() positionCreate: PositionCreate) {
    return await this.positionRepository.create(positionCreate);
  }
  @Get()
  async get() {
    const { count, rows } = await this.positionRepository.findAndCountAll<Position>({
      where: {},
      include: [
        {
          model: Employee,
        },
      ],
    });
    return rows;
  }
}
