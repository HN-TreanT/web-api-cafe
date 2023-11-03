import { ApiProperty } from "@nestjs/swagger";
import { OrderEnum } from "src/constants/order.enum";

export class MaterialOrder {
  @ApiProperty()
  order_name: OrderEnum;

  @ApiProperty()
  order_amount: OrderEnum;
}
