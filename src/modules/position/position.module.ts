import { Module } from "@nestjs/common";
import { PositionController } from "./position.controller";
import { POSITION_REPOSITORY } from "src/constants/repository_enum";
import { Position } from "./position.entity";

@Module({
  imports: [],
  controllers: [PositionController],
  providers: [
    {
      provide: POSITION_REPOSITORY,
      useValue: Position,
    },
  ],
})
export class PositionModule {}
