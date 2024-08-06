import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { EMPLOYEE_REPOSITORY } from "src/constants/repository_enum";
import { Employee } from "../employee/employee.entity";
import * as bcrypt from "bcrypt";
import RegisterInfo from "./dto/register-info";
import EmployeeReponse from "../employee/dto/employee-response.dto";
import { JwtService } from "@nestjs/jwt";
import { jwtContants } from "src/constants/jwtConstant";
import InfoChangePassword from "./dto/info-change-password.dto";
import { use } from "passport";
import { MailService } from "src/helpers/mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY) private readonly authRepository: typeof Employee,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.authRepository.findOne({ where: { username: username } });
    if (!user) throw new NotFoundException({ status: false, message: "user not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException({ status: false, message: "password inccorect" });
    if (user && isMatch) return user;
    return null;
  }

  async register(registerInfo: RegisterInfo): Promise<Employee> {
   try {

    const hashPassword = await bcrypt.hash(registerInfo.password, 10);
    registerInfo.password = hashPassword;
    if (!registerInfo.id_position) {
      registerInfo.id_position = "U";
      return await this.authRepository.create(registerInfo);
    }
    const user = await this.authRepository.create(registerInfo);
    return user;
   } catch (err: any) {
    console.log(err)
    throw new BadRequestException(err)
   }
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

  async changePassword(info: InfoChangePassword): Promise<Employee> {
    const user = await this.validateUser(info.username, info.old_password);
    const hashNewPassword = await bcrypt.hash(info.new_password, 10);
    user.password = hashNewPassword;
    return await user.save();
  }

  async refresh(payload: any): Promise<string> {
    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }

  async forgetPassowrd(email: string) {
    const user = await this.authRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) throw new NotFoundException({ message: "email not exists", status: false });
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text: string = "";
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    const hashPassord = await bcrypt.hash(text, 10);
    user.password = hashPassord;
    await user.save();
    await this.mailService.sendUserConfirmation(user, text);
    return true;
  }
}
