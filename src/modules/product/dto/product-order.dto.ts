import { IsEnum } from "class-validator";
import { OrderEnum } from "src/constants/order.enum";

export class ProductOrder {
  order_name: OrderEnum;

  order_price: OrderEnum;
}
