import { DetailShipmentEdit } from "src/modules/detail_shipment/dto/detail-shipment-edit";

export class ShipmentDto {
  id_supplier: number;
  id_employee: number;
  price: number;

  lst_detail_shipment: DetailShipmentEdit[];
}
