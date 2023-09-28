import { Module } from "@nestjs/common";
import { DetailShipmentController } from "./detail-shipment.controller";
import { DetailShipmentService } from "./detail-shipment.service";
import { detailShipmentProvider } from "./detail-shipment.provider";

@Module({
  imports: [],
  controllers: [DetailShipmentController],
  providers: [DetailShipmentService, ...detailShipmentProvider],
  exports: [DetailShipmentService],
})
export class DetailShipmentModule {}
