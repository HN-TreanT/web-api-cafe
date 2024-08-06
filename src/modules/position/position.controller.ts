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
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { POSITION_REPOSITORY } from "src/constants/repository_enum";
import { Position } from "./position.entity";
import { PositionCreate } from "./dto/position-create.dto";
import { Employee } from "../employee/employee.entity";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('position')
@Controller("position")
export class PositionController {
  constructor(@Inject(POSITION_REPOSITORY) private readonly positionRepository: typeof Position) {}

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post("/")
  async create(@Body() positionCreate: PositionCreate) {
    return await this.positionRepository.create(positionCreate);
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/")
  async get() {
    const { count, rows } = await this.positionRepository.findAndCountAll<Position>({
      where: {},
    });
    return rows;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
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

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: string) {
    const role = await this.positionRepository.findByPk(id);
    if (!role) throw new NotFoundException({ message: "not found role", status: false });
    await role.destroy();
    return true;
  }
}
