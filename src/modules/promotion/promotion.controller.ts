import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { PromotionServices } from "./promotion.service";
import { resposeSuccess } from "src/helpers/Response";
import { PromotionCreate } from "./dto/promtion-create.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { PromotionEdit } from "./dto/promtion-edit.dto";

@Controller("promotion")
export class PromotionController {
  constructor(private readonly promotionService: PromotionServices) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any) {
    const pagination = req.pagination;
    const data = await this.promotionService.get(pagination, {});
    return resposeSuccess(data);
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.promotionService.getById(id);
    return resposeSuccess(data);
  }

  @Post()
  async create(@Body() promotionCreate: PromotionCreate) {
    const data = await this.promotionService.create(promotionCreate);
    return resposeSuccess(data);
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() promotionEdit: PromotionEdit) {
    const data = await this.promotionService.edit(id, promotionEdit);
    return resposeSuccess(data);
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.promotionService.delete(id);
    return resposeSuccess();
  }
}