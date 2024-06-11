import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import { PaginationGuard } from "./guards/pagination.guard";
import { searcgImageDTO } from "./common/SearchImageDTO";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpFaceDTO } from "./common/UpFaceDTO";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(PaginationGuard)
  @Get()
  getHello() {
    return this.appService.getHello();
  }


  @Post("/search-image")
  @UseInterceptors(FileInterceptor("image"))
  searchImage(@Query() query:searcgImageDTO, @UploadedFile() image: Express.Multer.File) {
    return this.appService.searcgImage(query.config_param, image)
  }

  @Post("/upsert-image")
  @UseInterceptors(FileInterceptor("image"))
  upImage(@Query() query: UpFaceDTO, @UploadedFile() image: Express.Multer.File) {
    return this.appService.upImage(query, image)
  }

  @Get("/delete-face/:id")
  deleteFace(@Param("id") id: number) {
    return this.appService.deleteDocument(id)
  }
}
