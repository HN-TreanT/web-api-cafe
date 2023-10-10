import { DETAIL_SHIPMENT_REPOSITORY, MATERIAL_REPOSITORY, SHIPMENT_REPOSITORY, SUPPLIER_REPOSITORY } from "src/constants/repository_enum";

import { Shipment } from "./shipment.entity";
import { DetailShipment } from "../detail_shipment/detail_shipment.enitty";
import { Material } from "../material/material.entity";
import { Supplier } from "../supplier/supplier.entity";

export const shipmentProvider = [
  { provide: SHIPMENT_REPOSITORY, useValue: Shipment },
  {
    provide: DETAIL_SHIPMENT_REPOSITORY,
    useValue: DetailShipment,
  },
  {
    provide: MATERIAL_REPOSITORY,
    useValue: Material,
  },
  {
    provide: SUPPLIER_REPOSITORY,
    useValue: Supplier,
  },
];
