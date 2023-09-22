import { Body, Controller, Inject, Post } from "@nestjs/common";
import { POSITION_REPOSITORY } from "src/constants/repository_enum";
import { Position } from "./position.entity";
import { PositionCreate } from "./dto/position-create.dto";

@Controller("position")
export class PositionController {
  constructor(@Inject(POSITION_REPOSITORY) private readonly positionRepository: typeof Position) {}
  @Post()
  async create(@Body() positionCreate: PositionCreate) {
    return await this.positionRepository.create(positionCreate);
  }
}
