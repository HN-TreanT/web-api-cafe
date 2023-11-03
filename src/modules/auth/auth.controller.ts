import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import RegisterInfo from "./dto/register-info";
import { LocalAuthGuard } from "src/guards/local.guard";
import InfoChangePassword from "./dto/info-change-password.dto";
import { JwtRefreshGuard } from "src/guards/jwt-refresh.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async register(@Body() registerInfo: RegisterInfo) {
    return this.authService.register(registerInfo);
  }
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async signIn(@Req() req: any) {
    return this.authService.signIn(req.user);
  }

  @Post("/change-password")
  async changePassword(@Body() data: InfoChangePassword) {
    return this.authService.changePassword(data);
  }

  @Post("/refresh")
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() req: any) {
    const user = req.user;
    return this.authService.refresh(user);
  }

  @Get("/forget-password/:email")
  async forgetPassword(@Param("email") email: string) {
    return this.authService.forgetPassowrd(email);
  }
}
