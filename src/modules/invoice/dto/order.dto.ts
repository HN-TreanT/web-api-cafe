import { ApiProperty } from "@nestjs/swagger";

export class OrderInvoiceDto {
  @ApiProperty()
  order_price: string;
  @ApiProperty()
  order_time_pay: string;
  @ApiProperty()
  createdAt: string;
}
