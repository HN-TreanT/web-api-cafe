import { ApiProperty } from "@nestjs/swagger";

export class SupplierEdit {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  email: string;
}
