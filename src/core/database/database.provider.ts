import { Sequelize } from "sequelize-typescript";

import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from "../constants";
import { databaseConfig } from "./database.config";
import { Employee } from "src/modules/employee/employee.entity";
import { EmployeeWorkShift } from "src/modules/employee_workshift/employee_workshift.entity";
import { Workshift } from "src/modules/workshift/workshift.entity";
import { Position } from "src/modules/position/position.entity";
import { Invoice } from "src/modules/invoice/invoice.entity";
import { Customer } from "src/modules/customer/customer.entity";
import { Promotion } from "src/modules/promotion/promotion.entity";
import { TableFood } from "src/modules/table_food/table_food.entity";
import { TableFoodInvoice } from "src/modules/table_food_invoice/table_food_invoice.entity";
import { InvoiceDetail } from "src/modules/invoice_detail/invoice_detail.entity";
import { Product } from "src/modules/product/product.entity";
import { Category } from "src/modules/category/category.entity";
import { DetailCombo } from "src/modules/detail_combo/detail_combo.entity";
import { Combo } from "src/modules/combo/combo.entity";
import { UseMaterial } from "src/modules/use_material/use_material.entity";
import { Material } from "src/modules/material/material.entity";
import { CheckInventory } from "src/modules/check_inventory/check_inventory";
import { DetailShipment } from "src/modules/detail_shipment/detail_shipment.enitty";
import { Shipment } from "src/modules/shipment/shipment.entity";
import { Supplier } from "src/modules/supplier/supplier.entity";
import { DetailCheckInventory } from "src/modules/detail-check-inventory/detail_check-inventory.entity";
import { format } from "date-fns";

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config = databaseConfig[process.env.NODE_ENV || DEVELOPMENT];
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        Employee,
        EmployeeWorkShift,
        Workshift,
        Position,
        Invoice,
        Customer,
        Promotion,
        TableFood,
        TableFoodInvoice,
        InvoiceDetail,
        Product,
        Category,
        DetailCombo,
        Combo,
        UseMaterial,
        Material,
        CheckInventory,
        DetailShipment,
        Shipment,
        Supplier,
        DetailCheckInventory,
      ]);
      // sequelize.addHook("afterFind", (results: any, options) => {
      //   if (Array.isArray(results)) {
      //     results.forEach((result) => {
      //       if (result?.dataValues.time_check) {
      //         result.dataValues.time_check = format(result.dataValues.time_check, "yyyy-mm-dd hh:mm:ss");
      //       }
      //       if (result?.dataValues.expriation_date) {
      //         result.dataValues.expriation_date = format(result.dataValues.expriation_date, "yyyy-mm-dd hh:mm:ss");
      //       }
      //       if (result?.dataValues.createdAt) {
      //         result.dataValues.createdAt = format(result.dataValues.createdAt, "yyyy-mm-dd hh:mm:ss");
      //       }
      //       if (result?.dataValues.updatedAt) {
      //         result.dataValues.updatedAt = format(result.dataValues.updatedAt, "yyyy-mm-dd hh:mm:ss");
      //       }
      //     });
      //   } else {
      //     if (results?.dataValues.time_check) {
      //       results.dataValues.time_check = format(results.dataValues.time_check, "yyyy-mm-dd hh:mm:ss");
      //     }
      //     if (results?.dataValues.expriation_date) {
      //       results.dataValues.expriation_date = format(results.dataValues.expriation_date, "yyyy-mm-dd hh:mm:ss");
      //     }
      //     if (results?.dataValues.createdAt) {
      //       results.dataValues.createdAt = format(results.dataValues.createdAt, "yyyy-mm-dd hh:mm:ss");
      //     }
      //     if (results?.dataValues.updatedAt) {
      //       results.dataValues.updatedAt = format(results.dataValues.updatedAt, "yyyy-mm-dd hh:mm:ss");
      //     }
      //   }
      // });
      await sequelize.sync({});
      return sequelize;
    },
  },
];
