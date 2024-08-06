import { DETAIL_SHIPMENT_REPOSITORY, MATERIAL_REPOSITORY } from "src/constants/repository_enum";

import { Material } from "./material.entity";
import { DetailShipment } from "../detail_shipment/detail_shipment.enitty";

export const materialProvider = [
  { provide: MATERIAL_REPOSITORY, useValue: Material },
  { provide: DETAIL_SHIPMENT_REPOSITORY, useValue: DetailShipment },
];
