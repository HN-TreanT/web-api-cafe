import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { EMPLOYEE_REPOSITORY } from "src/constants/repository_enum";
import { Employee } from "../employee/employee.entity";
import * as bcrypt from "bcrypt";
import RegisterInfo from "./dto/register-info";
import EmployeeReponse from "../employee/dto/employee-response.dto";
import { JwtService } from "@nestjs/jwt";
import { jwtContants } from "src/constants/jwtConstant";

@Injectable()
export class AuthService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY) private readonly authRepository: typeof Employee,
    private readonly jwtService: JwtService
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.authRepository.findOne({ where: { username: username } });
    if (!user) throw new NotFoundException("user not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException("password inccorect");
    if (user && isMatch) return user;
    return null;
  }

  async register(registerInfo: RegisterInfo) {
    const hashPassword = await bcrypt.hash(registerInfo.password, 10);
    registerInfo.password = hashPassword;
    if (!registerInfo.id_position) {
      registerInfo.id_position = "U";
      return await this.authRepository.create(registerInfo);
    }
    const user = await this.authRepository.create(registerInfo);
    return user;
  }

  async signIn(user: Employee): Promise<any> {
    const payload = {
      email: user.email,
      id_position: user.id_position,
      username: user.username,
    };
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: jwtContants.refreshToken_secret,
      expiresIn: "300d",
    });
    user.refresh_token = refresh_token;
    await user.save();
    return { ...user.dataValues, access_token };
  }
}
