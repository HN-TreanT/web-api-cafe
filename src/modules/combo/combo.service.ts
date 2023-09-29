import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { COMBO_REPOSITORY, DETAIL_COMBO_REPOSITORY } from "src/constants/repository_enum";
import { Combo } from "./combo.entity";
import { PagedData } from "src/models/PagedData";
import { ComboCreate } from "./dto/combo-create.dto";
import { ComboEdit } from "./dto/combo-edit.dto";
import { DetailCombo } from "../detail_combo/detail_combo.entity";
import { Product } from "../product/product.entity";
import { DetailComboService } from "../detail_combo/detail-combo.service";
import { tranform_date } from "src/common/tranform-date";

@Injectable()
export class ComboService {
  constructor(
    @Inject(COMBO_REPOSITORY) private readonly comboRepository: typeof Combo,
    @Inject(DETAIL_COMBO_REPOSITORY) private readonly detailComboRepository: typeof DetailCombo
  ) {}
  async get(pagination: any, filter: any): Promise<PagedData<Combo>> {
    const { count, rows } = await this.comboRepository.findAndCountAll({
      where: { ...filter },
      ...pagination,
      include: [
        {
          model: DetailCombo,
          include: [Product],
        },
      ],
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

  async getById(id: number): Promise<Combo> {
    const combo = await this.comboRepository.findByPk(id, {
      include: [
        {
          model: DetailCombo,
          include: [Product],
        },
      ],
    });
    if (!combo) throw new NotFoundException({ message: "not found combo", status: false });
    return combo;
  }

  async create(infoCreate: ComboCreate): Promise<Combo> {
    const combo = await this.comboRepository.create(infoCreate);
    const detailProductCreate = infoCreate.id_products.map((item) => {
      return {
        ...item,
        id_combo: combo.id,
      };
    });
    await this.detailComboRepository.bulkCreate(detailProductCreate);
    return combo;
  }

  async edit(id: number, infoEdit: ComboEdit): Promise<Combo> {
    const combo = await this.comboRepository.findByPk(id);

    if (!combo) throw new NotFoundException({ message: "not found combo", status: false });
    const detailProductCreate = infoEdit.id_products.map((item) => {
      return {
        ...item,
        id_combo: combo.id,
      };
    });
    await this.detailComboRepository.destroy({
      where: {
        id_combo: combo.id,
      },
    });

    await this.detailComboRepository.bulkCreate(detailProductCreate);

    return await combo.update(infoEdit);
  }

  async deleteById(id: number) {
    await this.comboRepository.destroy({
      where: {
        id: id,
      },
    });
    return true;
  }
}
