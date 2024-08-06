import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DetailShipmentCreate {
  @ApiProperty()
  @IsNotEmpty()
  id_shipment: number;

  @ApiProperty()
  @IsNotEmpty()
  id_material: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  expiration_date: Date;
}
