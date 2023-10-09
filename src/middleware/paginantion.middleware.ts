import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { page, size } = req.query;
    req.pagination = {
      limit: parseInt(size || 1000),
      offset: (page - 1) * size || 0,
    };
    next();
  }
}
