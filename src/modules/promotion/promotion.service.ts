import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PROMOTION_REPOSITORY } from "src/constants/repository_enum";
import { Promotion } from "./promotion.entity";
import { PagedData } from "src/models/PagedData";
import { PromotionCreate } from "./dto/promtion-create.dto";
import { PromotionEdit } from "./dto/promtion-edit.dto";

@Injectable()
export class PromotionServices {
  constructor(@Inject(PROMOTION_REPOSITORY) private readonly promotionRepository: typeof Promotion) {}
  async get(pagination: any, filter: any): Promise<PagedData<Promotion>> {
    const { count, rows } = await this.promotionRepository.findAndCountAll({
      where: { ...filter },
      order: [["createdAt", "DESC"]],
      ...pagination,
    });
    const pageNumber = pagination.offset / pagination.limit + 1;
    const data = {
      CurrentPage: pageNumber,
      TotalPage: count,
      CanNext: pageNumber < count,
      CanBack: pageNumber > 1,
      data: rows,
    };
    return data;
  }
  async getById(id: number): Promise<Promotion> {
    const promotion = await this.promotionRepository.findByPk(id);
    if (!promotion) throw new NotFoundException({ message: "not found promotion", status: false });
    return promotion;
  }

  async create(promotionCreate: PromotionCreate): Promise<Promotion> {
    return await this.promotionRepository.create(promotionCreate);
  }

  async edit(id: number, promotionEdit: PromotionEdit): Promise<Promotion> {
    const promotion = await this.promotionRepository.findByPk(id);
    if (!promotion) throw new NotFoundException({ message: "not found promotion", status: false });
    return promotion.update(promotionEdit);
  }
  async delete(id: number) {
    const promotion = await this.promotionRepository.findByPk(id);
    if (!promotion) throw new NotFoundException({ message: "not found promotion", status: false });
    await promotion.destroy();
    return true;
  }
}
