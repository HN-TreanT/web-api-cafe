import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { OrderEnum } from "src/constants/order.enum";

export class ProductOrder {
  @ApiProperty({required:false, type: OrderEnum})
  order_name: OrderEnum;

  @ApiProperty({required:false, type: OrderEnum})
  order_price: OrderEnum;
}
