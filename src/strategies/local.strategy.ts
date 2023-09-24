import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/modules/auth/auth.service";
import { Request as ExpressRequest } from "express";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    });
  }
  async validate(req: ExpressRequest, username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException({ status: false, message: "Invalid username or password" });
    }
    return user;
  }
}
