import { Inject, Injectable } from "@nestjs/common";
import { COMBO_REPOSITORY } from "src/constants/repository_enum";
import { Combo } from "./combo.entity";
import { PagedData } from "src/models/PagedData";

@Injectable()
export class ComboService {
  constructor(@Inject(COMBO_REPOSITORY) private readonly comboRepository: typeof Combo) {}
  async get(pagination: any, filter: any): Promise<PagedData<Combo>> {
    const { count, rows } = await this.comboRepository.findAndCountAll({
      where: { ...filter },
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
}
