import { ClassSerializerInterceptor, Controller, UseInterceptors } from "@nestjs/common";

@Controller("employee")
@UseInterceptors(ClassSerializerInterceptor)
export class EmployeeController {
  constructor() {}
}
