import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DETAIL_COMBO_REPOSITORY } from "src/constants/repository_enum";
import { DetailCombo } from "./detail_combo.entity";
import { PagedData } from "src/models/PagedData";
import { DetailComboCreate } from "./dto/detailcobom-create.dto";
import { DetailComboEdit } from "./dto/detailcombo-edit.dto";
import { Combo } from "../combo/combo.entity";
import { Product } from "../product/product.entity";
@Injectable()
export class DetailComboService {
  constructor(@Inject(DETAIL_COMBO_REPOSITORY) private readonly detailComboRepository: typeof DetailCombo) {}
  async get(pagination: any, filter: any): Promise<PagedData<DetailCombo>> {
    let filterData: any = {};
    if (filter.id_combo) filterData.id_combo = filter.id_combo;
    const { count, rows } = await this.detailComboRepository.findAndCountAll({
      where: { ...filterData },
      ...pagination,
      include: [{ model: Combo }, { model: Product }],

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

  async getById(id: number): Promise<DetailCombo> {
    const detail_combo = await this.detailComboRepository.findByPk(id, {});
    if (!detail_combo) throw new NotFoundException({ message: "not foun", status: false });
    return detail_combo;
  }

  async create(infoCreate: DetailComboCreate): Promise<DetailCombo> {
    return await this.detailComboRepository.create(infoCreate);
  }

  async createMany(infoCreate: DetailComboCreate[]) {
    await this.detailComboRepository.bulkCreate(infoCreate);
  }

  async edit(id: number, infoEdit: DetailComboEdit): Promise<DetailCombo> {
    const detail_combo = await this.detailComboRepository.findByPk(id);
    if (!detail_combo) throw new NotFoundException({ message: "not foun", status: false });
    return detail_combo.update(infoEdit);
  }

  async deleteById(id: number) {
    const detail_combo = await this.detailComboRepository.findByPk(id);
    if (!detail_combo) throw new NotFoundException({ message: "not foun", status: false });
    return detail_combo.destroy();
  }
}
