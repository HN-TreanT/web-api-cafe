import { Inject, Injectable, NotFoundException, Req } from "@nestjs/common";
import { DETAIL_SHIPMENT_REPOSITORY, MATERIAL_REPOSITORY } from "src/constants/repository_enum";
import { Material } from "./material.entity";
import { PagedData } from "src/models/PagedData";
import { DetailCheckInventory } from "../detail-check-inventory/detail_check-inventory.entity";
import { MaterialCreate } from "./dto/material-create.dto";
import { MaterialEdit } from "./dto/material-edit.dto";
import { Model, Op } from "sequelize";
import { MaterialOrder } from "./dto/material-order.dto";
import { DetailShipment } from "../detail_shipment/detail_shipment.enitty";
import { UseMaterial } from "../use_material/use_material.entity";
@Injectable()
export class MaterialSerivce {
  constructor(
    @Inject(MATERIAL_REPOSITORY) private readonly materialRepository: typeof Material,
    @Inject(DETAIL_SHIPMENT_REPOSITORY) private readonly detailShipmentRepository: typeof DetailShipment
  ) {}
  async get(pagination: any, search: string, order: MaterialOrder): Promise<PagedData<Material>> {
    let filter: any = {};
    let order_material: any = [];
    if (search) filter.name = { [Op.substring]: search };
    if (order.order_amount) order_material = [...order_material, ["amount", `${order.order_amount}`]];
    if (order.order_name) order_material = [...order_material, ["name", `${order.order_name}`]];
    const { count, rows } = await this.materialRepository.findAndCountAll({
      where: {
        ...filter,
      },
      order: [...order_material],
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

  async getById(id: number): Promise<Material> {
    const material = await this.materialRepository.findByPk(id, {
      include: [
        {
          model: DetailCheckInventory,
        },
      ],
    });
    if (!material) throw new NotFoundException({ message: "not found material", status: false });
    return material;
  }

  async create(infoCreate: MaterialCreate): Promise<Material> {
    return await this.materialRepository.create(infoCreate);
  }

  async edit(id: number, infoEdit: MaterialEdit): Promise<Material> {
    const material = await this.materialRepository.findByPk(id);
    if (!material) throw new NotFoundException({ message: "not found material", status: false });
    return await material.update(infoEdit);
  }

  async delete(id: number) {
    const material = await this.materialRepository.findByPk(id);
    if (!material) throw new NotFoundException({ message: "not found material", status: false });
    await this.detailShipmentRepository.destroy({
      where: {
        id_material: material.id,
      },
    });
    return await material.destroy();
  }
}
