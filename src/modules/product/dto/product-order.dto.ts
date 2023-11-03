import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { OrderEnum } from "src/constants/order.enum";

export class ProductOrder {
  @ApiProperty()
  order_name: OrderEnum;

  @ApiProperty()
  order_price: OrderEnum;
}
