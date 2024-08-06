import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class DetailShipmentEdit {
  @ApiProperty()
  id_shipment: number;

  @ApiProperty()
  id_material: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  expiration_date: Date;
}
