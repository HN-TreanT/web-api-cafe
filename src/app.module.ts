import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { databaseModule } from "./core/database/database.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CacheModule } from "@nestjs/cache-manager";
import { BullModule } from "@nestjs/bull";
import * as redisStore from "cache-manager-redis-store";
import { APP_FILTER } from "@nestjs/core";
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: 100,
        store: redisStore,
        host: "localhost",
        port: 6379,
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),

    databaseModule,
    LoggerModule,
    StorageModule,
    EmployeeModule,
    AuthModule,
    PositionModule,
    MailModule,
    WorkshiftModule,
    EmployeeWorkShiftModule,
    PromotionModule,
    ProductModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
