import { ApiProperty } from "@nestjs/swagger";

export class DetailShipmentFilter {
  @ApiProperty()
  name_material: string;

  @ApiProperty()
  id_shipment: number;
}
