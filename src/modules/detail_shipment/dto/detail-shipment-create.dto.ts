import { IsNotEmpty } from "class-validator";

export class DetailShipmentCreate {
  @IsNotEmpty()
  id_shipment: number;
  @IsNotEmpty()
  id_material: number;

  amount: number;
  price: number;
  expiration_date: Date;
}
