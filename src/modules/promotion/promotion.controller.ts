import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { PromotionServices } from "./promotion.service";

import { PromotionCreate } from "./dto/promtion-create.dto";
import { PaginationGuard } from "src/guards/pagination.guard";
import { PromotionEdit } from "./dto/promtion-edit.dto";
import { PromotionFilter } from "./dto/promotion-filter.dto";
import { Op } from "sequelize";

@Controller("promotion")
export class PromotionController {
  constructor(private readonly promotionService: PromotionServices) {}
  @Get("/")
  @UseGuards(PaginationGuard)
  async get(@Req() req: any, @Query() filter: PromotionFilter) {
    let promotion_filter: any = {};
    const pagination = req.pagination;
    if (filter.name) promotion_filter.name = { [Op.substring]: filter.name };

    if (filter.condition) promotion_filter.condition = { [Op.lt]: filter.condition };
    const data = await this.promotionService.get(pagination, promotion_filter);
    return data;
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    const data = await this.promotionService.getById(id);
    return data;
  }

  @Post()
  async create(@Body() promotionCreate: PromotionCreate) {
    const data = await this.promotionService.create(promotionCreate);
    return data;
  }

  @Put("/:id")
  async edit(@Param("id") id: number, @Body() promotionEdit: PromotionEdit) {
    const data = await this.promotionService.edit(id, promotionEdit);
    return data;
  }
  @Delete("/:id")
  async deleteById(@Param("id") id: number) {
    await this.promotionService.delete(id);
    return true;
  }
}
