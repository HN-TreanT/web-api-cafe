import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { COMBO_REPOSITORY, DETAIL_COMBO_REPOSITORY, PRODUCT_REPOSITORY } from "src/constants/repository_enum";
import { Combo } from "./combo.entity";
import { PagedData } from "src/models/PagedData";
import { ComboCreate } from "./dto/combo-create.dto";
import { ComboEdit } from "./dto/combo-edit.dto";
import { DetailCombo } from "../detail_combo/detail_combo.entity";
import { Product } from "../product/product.entity";
import { ProductServices } from "../product/product.service";
import { UseMaterial } from "../use_material/use_material.entity";
import { Material } from "../material/material.entity";

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

    const total = await this.comboRepository.count({ where: { ...filter } });
    const pageNumber = pagination.offset / pagination.limit + 1;
    const data = {
      CurrentPage: pageNumber,
      TotalPage: total,
      CanNext: pageNumber < total,
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
    if (infoCreate.id_products) {
      const detailProductCreate = infoCreate.id_products.map((item) => {
        return {
          ...item,
          id_combo: combo.id,
        };
      });
      await this.detailComboRepository.bulkCreate(detailProductCreate);
    }
    return combo;
  }

  async edit(id: number, infoEdit: ComboEdit): Promise<Combo> {
    const combo = await this.comboRepository.findByPk(id);

    if (!combo) throw new NotFoundException({ message: "not found combo", status: false });
    if (infoEdit.id_products) {
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
    }
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

  async checkValidMaterial(id_combo: number, amount_combo: number) {
    const combo = await this.comboRepository.findByPk(id_combo, {
      include: [
        {
          model: DetailCombo,
          include: [
            {
              model: Product,
              include: [{ model: UseMaterial, include: [Material] }],
            },
          ],
        },
      ],
    });
    if (!combo) throw new NotFoundException({ message: "not found combo", status: false });
    if (combo.detail_combos) {
      combo.detail_combos.map((item: any) => {
        if (item.product.use_materials) {
          item.product.use_materials.map((item: any) => {
            if (item.amount * amount_combo > item.material.amount) {
              throw new NotFoundException({ message: `Số lượng nguyên liệu ${item.material.name} không đủ `, status: false });
            }
          });
        }
      });
    }
    return true;
  }
}
