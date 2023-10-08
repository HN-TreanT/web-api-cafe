import { DETAIL_SHIPMENT_REPOSITORY, MATERIAL_REPOSITORY } from "src/constants/repository_enum";
import { DetailShipment } from "./detail_shipment.enitty";
import { Material } from "../material/material.entity";

export const detailShipmentProvider = [
  {
    provide: DETAIL_SHIPMENT_REPOSITORY,
    useValue: DetailShipment,
  },
  {
    provide: MATERIAL_REPOSITORY,
    useValue: Material,
  },
];
