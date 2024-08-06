import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DETAIL_SHIPMENT_REPOSITORY, MATERIAL_REPOSITORY, SHIPMENT_REPOSITORY, SUPPLIER_REPOSITORY } from "src/constants/repository_enum";
import { Shipment } from "./shipment.entity";
import { PagedData } from "src/models/PagedData";
import { ShipmentDto } from "./dto/shipment.dto";
import { Supplier } from "../supplier/supplier.entity";
import { Employee } from "../employee/employee.entity";
import { DetailShipment } from "../detail_shipment/detail_shipment.enitty";
import { Material } from "../material/material.entity";
import * as xlsx from "xlsx";
import { format, parse } from "date-fns";

@Injectable()
export class ShipmentService {
  constructor(
    @Inject(SHIPMENT_REPOSITORY) private readonly shipmentRepository: typeof Shipment,
    @Inject(DETAIL_SHIPMENT_REPOSITORY) private readonly detailShipmentRepository: typeof DetailShipment,
    @Inject(MATERIAL_REPOSITORY) private readonly materialRepository: typeof Material,
    @Inject(SUPPLIER_REPOSITORY) private readonly supllierRepository: typeof Supplier
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
        // {
        //   model: DetailShipment,
        // },
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
      include: [Employee, Supplier, DetailShipment],
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

      ///update amount material
      infoCreate.lst_detail_shipment.forEach(async (item) => {
        const material = await this.materialRepository.findByPk(item.id_material);
        if (material) await material.update({ amount: material.amount + item.amount });
      });
    }

    return await shipment.save();
  }

  async edit(id: number, editInfo: ShipmentDto) {
    const shipment = await this.shipmentRepository.findByPk(id);
    if (!shipment) throw new NotFoundException({ message: "not found shipment", status: false });
    let price: number = 0;
    if (editInfo.lst_detail_shipment) {
      // const detail_shipments =
      editInfo.lst_detail_shipment.forEach(async (item) => {
        price = price + item.price;
        const detail_shipment = await this.detailShipmentRepository.findByPk(item.id_dt_shipment);
        const material = await this.materialRepository.findByPk(item.id_material);

        if (material) {
          await material.update({ amount: material.amount + item.amount - detail_shipment.amount });
        }
        if (detail_shipment) {
          await detail_shipment.update({ ...item, id_shipment: shipment.id });
        }
      });
      editInfo.price = price;
      // await this.detailShipmentRepository.destroy({ where: { id_shipment: shipment.id } });
      // await this.detailShipmentRepository.bulkCreate(detail_shipments);

      //update amount material
      // editInfo.lst_detail_shipment.forEach(async (item) => {
      //   const material = await this.materialRepository.findByPk(item.id_material);
      //   if (material) await material.update({ amount: material.amount - item.old_amount + item.amount });
      // });
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

  async uploadFileExcel(file: Express.Multer.File) {
    if (!file) throw new NotFoundException({ message: "not found file", status: false });

    const workbook = xlsx.read(file.buffer);
    const sheetNames = workbook.SheetNames[0];
    const count_material = workbook.Sheets[sheetNames].E9.v;
    const id_employee = workbook.Sheets[sheetNames].E7.v;


    //id_employee
    
    const supplier = {
      name: workbook.Sheets[sheetNames].L6.v,
      phone_number: workbook.Sheets[sheetNames].L7.v,
      address: workbook.Sheets[sheetNames].L9.v,
      email: workbook.Sheets[sheetNames].L8.v,
    };

    let supllier = await this.supllierRepository.findOne({
      where: {
        email: supplier.email,
      },
    });
    if (!supllier) supllier = await this.supllierRepository.create(supplier);

    let lst_detail_shipment: any = [];
    for (let i = 13; i < 13 + count_material; i++) {
      const name_material = workbook.Sheets[sheetNames][`B${i}`].v;
      const unit_material = workbook.Sheets[sheetNames][`G${i}`].v;
      const count_material = workbook.Sheets[sheetNames][`I${i}`].v;
      const price_materila = workbook.Sheets[sheetNames][`M${i}`].v;
      const expriation_date = workbook.Sheets[sheetNames][`O${i}`].v;
      const format_date = parse(expriation_date, "dd/MM/yyyy", new Date());

      const material = await this.materialRepository.findOne({ where: { name: name_material } });
      if (!material) {
        const new_materail = await this.materialRepository.create({ name: name_material, unit: unit_material, expriation_date: format_date });
        lst_detail_shipment.push({
          id_material: new_materail.id,
          amount: count_material,
          price: price_materila,
          expiration_date: format_date,
        });
      } else {
        lst_detail_shipment.push({
          id_material: material.id,
          amount: count_material,
          price: price_materila,
          expiration_date: format_date,
        });
      }
    }

    const data: ShipmentDto = {
      id_employee: id_employee,
      id_supplier: supllier.id,
      price: 0,
      lst_detail_shipment: lst_detail_shipment,
    };
    return await this.create(data);
  }
}
