import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from "@nestjs/common";
import { POSITION_REPOSITORY } from "src/constants/repository_enum";
import { Position } from "./position.entity";
import { PositionCreate } from "./dto/position-create.dto";
import { Employee } from "../employee/employee.entity";

@Controller("position")
export class PositionController {
  constructor(@Inject(POSITION_REPOSITORY) private readonly positionRepository: typeof Position) {}
  @Post("/")
  async create(@Body() positionCreate: PositionCreate) {
    return await this.positionRepository.create(positionCreate);
  }
  @Get("/")
  async get() {
    const { count, rows } = await this.positionRepository.findAndCountAll<Position>({
      where: {},
    });
    return rows;
  }

  @Get("/:id")
  async getById(@Param("id") id: string) {
    const role = await this.positionRepository.findByPk(id);
    if (!role) throw new NotFoundException({ message: "not found role", status: false });
    return role;
  }

  // @Put("/:id")
  // async edit(@Param("id") id: number) {
  //   const role = await this.positionRepository.findByPk(id);
  //   if (!role) throw new NotFoundException({ message: "not found role", status: false });
  //   return role;
  // }
  @Delete("/:id")
  async deleteById(@Param("id") id: string) {
    const role = await this.positionRepository.findByPk(id);
    if (!role) throw new NotFoundException({ message: "not found role", status: false });
    await role.destroy();
    return true;
  }
}
