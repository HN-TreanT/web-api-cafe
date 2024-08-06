import { ApiProperty } from "@nestjs/swagger";
import { OrderEnum } from "src/constants/order.enum";

export class MaterialOrder {
  @ApiProperty({required:false})
  order_name: OrderEnum;

  @ApiProperty({required:false})
  order_amount: OrderEnum;
}
