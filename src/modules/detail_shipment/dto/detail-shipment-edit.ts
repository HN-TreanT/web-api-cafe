import { IsNotEmpty } from "class-validator";

export class DetailShipmentEdit {
  id_shipment: number;
  id_material: number;
  amount: number;
  price: number;
  expiration_date: Date;
}
