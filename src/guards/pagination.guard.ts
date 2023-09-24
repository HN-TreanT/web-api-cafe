import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PaginationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const { page, size } = req.query;
    req.pagination = {
      limit: parseInt(size || 1000),
      offset: (page - 1) * size || 0,
    };
    return true;
  }
}
