import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { PaginationGuard } from "./guards/pagination.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(PaginationGuard)
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
