import { Controller, Get, Post, Put, Param, Body, Query, UseGuards, Req, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { PaginationGuard } from "src/guards/pagination.guard";
import { ShipmentDto } from "./dto/shipment.dto";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";
import { ROLES } from "src/constants/role.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('shipment')
@Controller("shipment")
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @ApiBearerAuth()
  @Get("/")
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  async get(@Req() req: any, @Query("search") search: string) {
    const pagination = req.pagination;
    const data = await this.shipmentService.get(pagination, search);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.shipmentService.getById(id);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Post()
  async create(@Body() infoCreate: ShipmentDto) {
    const data = await this.shipmentService.create(infoCreate);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Put("/:id")
  async edit(@Param("id") id: number, @Body() infoEdit: ShipmentDto) {
    const data = await this.shipmentService.edit(id, infoEdit);
    return data;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.shipmentService.deleteById(id);
    return true;
  }

  @ApiBearerAuth()
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @UseInterceptors(FileInterceptor("file"))
  @Post("/upload-excel")
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    const res = await this.shipmentService.uploadFileExcel(file);
    return res;
  }
}
