import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { catchError, map, of, tap } from "rxjs";
import { UpFaceDTO } from "./common/UpFaceDTO";
import { JwtService } from "@nestjs/jwt";
import { EMPLOYEE_REPOSITORY } from "./constants/repository_enum";
import { Employee } from "./modules/employee/employee.entity";
import { jwtContants } from "./constants/jwtConstant";
import axios from "axios";
@Injectable()
export class AppService {
  constructor(
     private readonly httpService: HttpService,
     private readonly jwtService: JwtService,
     @Inject(EMPLOYEE_REPOSITORY) private readonly authRepository: typeof Employee,
     @Inject(EMPLOYEE_REPOSITORY) private readonly employeeRepository: typeof Employee,
     
    ) {}
  getHello(): string {
    return "heelo every body";
  }

  async searcgImage(query: string, image:  Express.Multer.File): Promise<any> {
    try {
      const response = await this.httpService
        .post("http://222.252.98.195:8889/searching-face", image.buffer, {
          params: { config_param: query, topk: 5, face_db: "face_cafe" },
          headers: {
            'Content-Type': 'application/octet-stream'
          }
        })
        .pipe(map(response => response.data))
        .toPromise(); // convert observable to promise
        if (response?.data) {
          if (Array.isArray(response.data) && response.data.length === 0) {
             return null
            }
        }
        const highestScoreElement = Array.isArray(response?.data) ?  response.data.reduce((max: any, item: any) => {
          return item.score > max.score ? item : max;
        }, response.data[0]) : null;
        if (!highestScoreElement) throw new NotFoundException({ message: "not found account", status: false });
        const employee = await this.employeeRepository.findByPk<Employee>(parseInt(highestScoreElement?.payload?.id));
        if (!employee)  throw new NotFoundException({ message: "not found account", status: false });
        const payload = {
          email: employee.dataValues.email,
          id_position: employee.dataValues.id_position,
          username: employee.dataValues.username,
        };
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload, {
          secret: jwtContants.refreshToken_secret,
          expiresIn: "300d",
        });
        return { ...employee.dataValues, access_token };
    } catch (error) {
      console.error('Error:', error); // This will print any error that occurs
      throw error;
    }
  }

  async upImage(query: UpFaceDTO, image:  Express.Multer.File): Promise<any> {
    const url = "http://222.252.98.195:8889/frs_upsert_face?name=" + query.name + "&id=" + query.id + "&index=" + 0 +
              "&collections=[face_cafe]" + "&conf_thres=0.5" + "&name_departments=[fb1]" +  "&id_departments=[1]" ;
    const res = await this.httpService.post(url, image.buffer, 
      {
      headers: {
        'Content-Type': 'application/octet-stream'
    }},
    )
      .pipe(
        map(response => response.data)
      )
      return res
  }

  async deleteDocument(id: number): Promise<any> {
    console.log(id)
    const url: string = 'http://222.252.98.195:6333/collections/face_cafe/points/delete';
    const body = {
      filter: {
        must: [
          {
            key: 'id',
            match: {
              value: `${id}`,
            },
          },
        ],
      },
    };

    try {
      const response = await axios.post(url, body);
      return response.data;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
}
