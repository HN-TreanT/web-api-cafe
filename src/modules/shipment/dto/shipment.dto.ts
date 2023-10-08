class DetailShipmentEdit {
  id_shipment: number;
  id_material: number;
  amount: number;
  price: number;
  expiration_date: Date;
}

export class ShipmentDto {
  id_supplier: number;
  id_employee: number;
  price: number;

  lst_detail_shipment: DetailShipmentEdit[];
}
