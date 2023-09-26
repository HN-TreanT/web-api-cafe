import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { COMBO_REPOSITORY } from "src/constants/repository_enum";
import { Combo } from "./combo.entity";
import { PagedData } from "src/models/PagedData";
import { ComboCreate } from "./dto/combo-create.dto";
import { ComboEdit } from "./dto/combo-edit.dto";

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

  async getById(id: number): Promise<Combo> {
    const combo = await this.comboRepository.findByPk(id);
    if (!combo) throw new NotFoundException({ message: "not found combo", status: false });
    return combo;
  }

  async create(infoCreate: ComboCreate): Promise<Combo> {
    return await this.comboRepository.create(infoCreate);
  }

  async edit(id: number, infoEdit: ComboEdit): Promise<Combo> {
    const combo = await this.comboRepository.findByPk(id);
    if (!combo) throw new NotFoundException({ message: "not found combo", status: false });
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
