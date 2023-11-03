import { ApiProperty } from "@nestjs/swagger";

class DetailShipmentEdit {
  @ApiProperty()
  id_dt_shipment: number;

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

export class ShipmentDto {
  @ApiProperty()
  id_supplier: number;

  @ApiProperty()
  id_employee: number;

  @ApiProperty()
  price: number;

  @ApiProperty({type: [DetailShipmentEdit]})
  lst_detail_shipment: DetailShipmentEdit[];
}
