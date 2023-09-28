import { DETAIL_SHIPMENT_REPOSITORY } from "src/constants/repository_enum";
import { DetailShipment } from "./detail_shipment.enitty";

export const detailShipmentProvider = [
  {
    provide: DETAIL_SHIPMENT_REPOSITORY,
    useValue: DetailShipment,
  },
];
