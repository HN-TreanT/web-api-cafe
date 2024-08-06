import { ApiProperty } from "@nestjs/swagger";

export class OrderInvoiceDto {
  @ApiProperty({required:false})
  order_price: string;
  @ApiProperty({required:false})
  order_time_pay: string;
  @ApiProperty({required:false})
  createdAt: string;
}
