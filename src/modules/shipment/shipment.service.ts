import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DETAIL_SHIPMENT_REPOSITORY, SHIPMENT_REPOSITORY } from "src/constants/repository_enum";
import { Shipment } from "./shipment.entity";
import { PagedData } from "src/models/PagedData";
import { ShipmentDto } from "./dto/shipment.dto";
import { Supplier } from "../supplier/supplier.entity";
import { Employee } from "../employee/employee.entity";
import { DetailShipment } from "../detail_shipment/detail_shipment.enitty";

@Injectable()
export class ShipmentService {
  constructor(
    @Inject(SHIPMENT_REPOSITORY) private readonly shipmentRepository: typeof Shipment,
    @Inject(DETAIL_SHIPMENT_REPOSITORY) private readonly detailShipmentRepository: typeof DetailShipment
  ) {}
  async get(pagination: any, filter: any): Promise<PagedData<Shipment>> {
    const { count, rows } = await this.shipmentRepository.findAndCountAll({
      where: { ...filter },
      order: [["createdAt", "DESC"]],
      ...pagination,
      include: [
        {
          model: Supplier,
        },
        {
          model: Employee,
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

  async getById(id: number): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findByPk(id, {
      include: [Employee, Supplier],
    });
    if (!shipment) throw new NotFoundException({ message: "not found shipment", status: false });
    return shipment;
  }

  async create(infoCreate: ShipmentDto): Promise<Shipment> {
    const shipment = await this.shipmentRepository.create(infoCreate);
    let price: number = 0;
    if (infoCreate.lst_detail_shipment) {
      const detail_shipments = infoCreate.lst_detail_shipment.map((item) => {
        price = price + item.price;
        return {
          ...item,
          id_shipment: shipment.id,
        };
      });
      shipment.price = price;
      await this.detailShipmentRepository.bulkCreate(detail_shipments);
    }
    return await shipment.save();
  }

  async edit(id: number, editInfo: ShipmentDto) {
    const shipment = await this.shipmentRepository.findByPk(id);
    if (!shipment) throw new NotFoundException({ message: "not found shipment", status: false });
    let price: number = 0;
    if (editInfo.lst_detail_shipment) {
      const detail_shipments = editInfo.lst_detail_shipment.map((item) => {
        price = price + item.price;
        return {
          ...item,
          id_shipment: shipment.id,
        };
      });
      editInfo.price = price;
      await this.detailShipmentRepository.destroy({ where: { id_shipment: shipment.id } });
      await this.detailShipmentRepository.bulkCreate(detail_shipments);
    }
    return shipment.update(editInfo);
  }

  async deleteById(id: number) {
    const shipment = await this.shipmentRepository.findByPk(id);
    if (!shipment) throw new NotFoundException({ message: "not found shipment", status: false });
    await this.detailShipmentRepository.destroy({
      where: {
        id_shipment: shipment.id,
      },
    });
    await shipment.destroy();
    return true;
  }
}
