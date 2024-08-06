import { Module } from "@nestjs/common";
import { ShipmentService } from "./shipment.service";
import { shipmentProvider } from "./shipment.provider";
import { ShipmentController } from "./shipment.controller";

@Module({
  imports: [],
  controllers: [ShipmentController],
  providers: [ShipmentService, ...shipmentProvider],
  exports: [ShipmentService],
})
export class ShipmentModule {}
