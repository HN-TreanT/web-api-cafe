import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtContants } from "src/constants/jwtConstant";
import { Employee } from "src/modules/employee/employee.entity";

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(Strategy, "accessToken") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtContants.secret,
    });
  }
  async validate(payload: Employee): Promise<any> {
    return {
      email: payload.email,
      name: payload.username,
      id_position: payload.id_position,
    };
  }
}
