import { ApiProperty } from "@nestjs/swagger";
import { OrderEnum } from "src/constants/order.enum";

export class DetailShipmentOrder {

  @ApiProperty()
  order_amount: OrderEnum;

  @ApiProperty()
  order_price: OrderEnum;
}
