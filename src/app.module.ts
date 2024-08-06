import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { databaseModule } from "./core/database/database.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { BullModule } from "@nestjs/bull";
import * as redisStore from "cache-manager-redis-store";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { AllExceptionFilter } from "./filter/exception.filter";
import { LoggerModule } from "./logger/logger.module";
import { StorageModule } from "./helpers/storage/storage.module";
import { EmployeeModule } from "./modules/employee/employee.module";
import { AuthModule } from "./modules/auth/auth.module";
import { PositionModule } from "./modules/position/position.module";
import { MailModule } from "./helpers/mail/mail.module";
import { WorkshiftModule } from "./modules/workshift/workshift.module";
import { EmployeeWorkShiftModule } from "./modules/employee_workshift/employee_workshift.module";
import { PromotionModule } from "./modules/promotion/promotion.module";
import { ProductModule } from "./modules/product/product.module";
import { CustomerModule } from "./modules/customer/customer.module";
import { TablefoodInvoiceModule } from "./modules/table_food_invoice/tablefood-invoice.module";
import { TableModule } from "./modules/table_food/table-food.module";
import { InvoiceModule } from "./modules/invoice/invoice.module";
import { ComboModule } from "./modules/combo/combo.module";
import { CategoryController } from "./modules/category/category.controller";
import { CategoryModule } from "./modules/category/category.module";
import { DetailComboModule } from "./modules/detail_combo/detail-combo.module";
import { MaterialSerivce } from "./modules/material/material.service";
import { MaterialModule } from "./modules/material/material.module";
import { UserMaterialModule } from "./modules/use_material/use_material.module";
import { SupplierModule } from "./modules/supplier/supplier.module";
import { ShipmentModule } from "./modules/shipment/shipment.module";
import { DetailShipmentModule } from "./modules/detail_shipment/detail-shipment.module";
import { CheckInventory } from "./modules/check_inventory/check_inventory";
import { CheckInventoryModule } from "./modules/check_inventory/check-inventory.module";
import { TransformInterceptor } from "./Interceptors/tranform.interceptor";
import { DTCheckInventorModule } from "./modules/detail-check-inventory/detail-check-inventor.module";
import { InvoiceDetailModule } from "./modules/invoice_detail/invoice-detail.module";
import { PaginationMiddleware } from "./middleware/paginantion.middleware";
import { EventGateway } from "./event.gateway";
import { HttpModule } from "@nestjs/axios";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtContants } from "./constants/jwtConstant";
import { authProviders } from "./modules/auth/auth.provider";
import { employeeProviders } from "./modules/employee/employee.provider";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     ttl: 100,
    //     store: redisStore,
    //     host: "localhost",
    //     port: 6379,
    //   }),
    // }),
    // BullModule.forRoot({
    //   redis: {
    //     host: "localhost",
    //     port: 6379,
    //   },
    // }),

    HttpModule,
    databaseModule,
    LoggerModule,
    StorageModule,
    EmployeeModule,
    AuthModule,
    PositionModule,
    MailModule,
    WorkshiftModule,
    EmployeeWorkShiftModule,
    EmployeeModule,
    PromotionModule,
    ProductModule,
    CustomerModule,
    TablefoodInvoiceModule,
    TableModule,
    InvoiceModule,
    ComboModule,
    CategoryModule,
    DetailComboModule,
    MaterialModule,
    UserMaterialModule,
    SupplierModule,
    ShipmentModule,
    DetailShipmentModule,
    CheckInventoryModule,
    DTCheckInventorModule,
    InvoiceDetailModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtContants.secret,
      signOptions: { expiresIn: "30m" },
    }),
  ],
  controllers: [AppController],
  providers: [
    ...employeeProviders,
    ...authProviders,
    EventGateway,
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes({ path: "*", method: RequestMethod.GET });
  }
}
