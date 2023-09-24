import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { WorkshiftServices } from "./workshift.service";
import { WorkshiftCreate } from "./dto/workshift-create.dto";
import { resposeSuccess } from "src/helpers/Response";

@Controller("workshift")
export class WorkshiftController {
  constructor(private readonly workshiftService: WorkshiftServices) {}
  @Get("/")
  async get() {
    const data = await this.workshiftService.get({});
    return resposeSuccess(data);
  }
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.workshiftService.getById(id);
    return resposeSuccess(data);
  }
  @Post()
  async create(@Body() createInfo: WorkshiftCreate) {
    const data = await this.workshiftService.create(createInfo);
    return resposeSuccess(data);
  }
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() updateInfo: WorkshiftCreate) {
    const data = await this.workshiftService.edit(id, updateInfo);
    return resposeSuccess(data);
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.workshiftService.delete(id);
    return resposeSuccess();
  }
}
