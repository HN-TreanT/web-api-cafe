import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import RegisterInfo from "./dto/register-info";
import { LocalAuthGuard } from "src/guards/local.guard";
import { JwtAccessGuard } from "src/guards/jwt-access.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorator/role.decorator";

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

  @Get()
  @Roles("A", "U")
  @UseGuards(JwtAccessGuard, RolesGuard)
  async get() {
    return true;
  }
}
