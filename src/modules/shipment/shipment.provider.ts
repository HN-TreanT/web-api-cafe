import { DETAIL_SHIPMENT_REPOSITORY, SHIPMENT_REPOSITORY } from "src/constants/repository_enum";

import { Shipment } from "./shipment.entity";
import { DetailShipment } from "../detail_shipment/detail_shipment.enitty";

export const shipmentProvider = [
  { provide: SHIPMENT_REPOSITORY, useValue: Shipment },
  {
    provide: DETAIL_SHIPMENT_REPOSITORY,
    useValue: DetailShipment,
  },
];
