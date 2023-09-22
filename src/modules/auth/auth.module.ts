import { Module } from "@nestjs/common";
import { EmployeeModule } from "../employee/employee.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtContants } from "src/constants/jwtConstant";
import { authProviders } from "./auth.provider";
import { LocalStrategy } from "src/strategies/local.strategy";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import JwtAccessStrategy from "src/strategies/jwt-access.strategy";
import JwtRefreshStrategy from "src/strategies/jwt_refresh.strategy";

@Module({
  imports: [
    EmployeeModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtContants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders, LocalStrategy, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
