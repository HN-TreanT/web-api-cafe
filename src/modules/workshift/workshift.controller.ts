import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { WorkshiftServices } from "./workshift.service";
import { WorkshiftCreate } from "./dto/workshift-create.dto";
import { Roles } from "src/decorator/role.decorator";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { ROLES } from "src/constants/role.enum";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('workshift')
@Controller("workshift")
export class WorkshiftController {
  constructor(private readonly workshiftService: WorkshiftServices) {}

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/")
  async get() {
    const data = await this.workshiftService.get({});
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN, ROLES.MANGER, ROLES.USER)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.workshiftService.getById(id);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() createInfo: WorkshiftCreate) {
    const data = await this.workshiftService.create(createInfo);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() updateInfo: WorkshiftCreate) {
    const data = await this.workshiftService.edit(id, updateInfo);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.workshiftService.delete(id);
    return true;
  }
}
