import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PagedData } from "src/models/PagedData";
import { DetailShipment } from "./detail_shipment.enitty";
import { DETAIL_SHIPMENT_REPOSITORY, MATERIAL_REPOSITORY } from "src/constants/repository_enum";
import { DetailShipmentCreate } from "./dto/detail-shipment-create.dto";
import { DetailShipmentEdit } from "./dto/detail-shipment-edit";
import { DetailShipmentFilter } from "./dto/detail-shipment-filter";
import { Op, Sequelize } from "sequelize";
import { Material } from "../material/material.entity";
import { DetailShipmentOrder } from "./dto/detail-shipment-order";
import { Shipment } from "../shipment/shipment.entity";
@Injectable()
export class DetailShipmentService {
  constructor(
    @Inject(DETAIL_SHIPMENT_REPOSITORY) private readonly detailShipmentRepository: typeof DetailShipment,
    @Inject(MATERIAL_REPOSITORY) private readonly materialRepository: typeof Material
  ) {}
  async get(pagination: any, filter: DetailShipmentFilter, order: DetailShipmentOrder): Promise<PagedData<DetailShipment>> {
    let filterData: any = {};
    let filterWithMaterial: any = {};
    let orderData: any = [];
    if (filter.id_shipment) filterData.id_shipment = filter.id_shipment;
    if (filter.name_material) filterWithMaterial.name = { [Op.substring]: filter.name_material };
    if (order.order_amount) orderData = [...orderData, ["amount", `${order.order_amount}`]];
    if (order.order_price) orderData = [...orderData, ["price", `${order.order_price}`]];
    const { count, rows } = await this.detailShipmentRepository.findAndCountAll({
      where: { ...filterData },
      order: [...orderData],
      ...pagination,
      include: [{ model: Material, 
        // where: { ...filterWithMaterial },
        //  required: false
         }, { model: Shipment }],
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

  async getById(id: number): Promise<DetailShipment> {
    const detail_shipment = await this.detailShipmentRepository.findByPk(id, {});
    if (!detail_shipment) throw new NotFoundException({ message: "not found", status: false });
    return detail_shipment;
  }

  async create(infoCreate: DetailShipmentCreate): Promise<DetailShipment> {
    const detail_shipment = await this.detailShipmentRepository.create(infoCreate);
    const material = await this.materialRepository.findByPk(infoCreate.id_material);
    if (!material) throw new NotFoundException({ message: "not found material", status: false });
    await material.update({ amount: material.amount + infoCreate.amount });
    return detail_shipment;
  }

  async edit(id: number, infoEdit: DetailShipmentEdit): Promise<DetailShipment> {
    const detail_shipment = await this.detailShipmentRepository.findByPk(id);
    if (!detail_shipment) throw new NotFoundException({ message: "not found", status: false });
    const material = await this.materialRepository.findByPk(infoEdit.id_material);
    if (!material) throw new NotFoundException({ message: "not found material", status: false });
    await material.update({ amount: material.amount + infoEdit.amount - detail_shipment.amount });
    return detail_shipment.update(infoEdit);
  }

  async delete(id: number) {
    const detail_shipment = await this.detailShipmentRepository.findByPk(id);
    if (!detail_shipment) throw new NotFoundException({ message: "not found", status: false });
    await detail_shipment.destroy();
    return true;
  }
}
