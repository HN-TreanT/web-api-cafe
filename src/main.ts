import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidateInputPipe } from "./pipe/validate.pipe";
import * as path from "path";
import * as bodyParser from "body-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AllExceptionFilter } from "./filter/exception.filter";
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix("/api/v1");
  app.useStaticAssets(path.join(__dirname, "../public"));

  app.use(bodyParser.json({}));
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(8080, async () => {
    console.log(`The server is running on ${8080} port: http://localhost:${8080}`);
  });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
